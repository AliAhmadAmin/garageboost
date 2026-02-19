import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Decrypt function (must match the one in admin config route)
function decrypt(encoded: string): string {
  try {
    return Buffer.from(encoded, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

// Get API key from database
async function getApiKey(key: string): Promise<string | null> {
  try {
    const config = await prisma.apiConfig.findUnique({
      where: { key, isActive: true },
    });
    if (!config) return null;
    return decrypt(config.value);
  } catch (error) {
    console.error(`Failed to get API key ${key}:`, error);
    return null;
  }
}

const MOCK_ADVISORIES = [
  { text: "Front brake pads wearing thin", category: "Brakes", estPricePence: 12000 },
  { text: "Nearside Rear Tyre worn close to legal limit", category: "Tyres", estPricePence: 8500 },
  { text: "Offside Front Suspension arm has slight play", category: "Suspension", estPricePence: 21000 },
  { text: "Exhaust has minor leak of exhaust gases", category: "Exhaust", estPricePence: 15000 },
  { text: "Oil leak but not excessive", category: "Engine", estPricePence: 4500 },
];

// Fetch vehicle data from DVLA API
async function fetchDVLAData(vrm: string, apiKey: string) {
  try {
    const response = await fetch("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ registrationNumber: vrm }),
    });

    if (!response.ok) {
      console.error("DVLA API error:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("DVLA Response for", vrm, ":", JSON.stringify(data, null, 2));
    
    return {
      make: data.make || data.engineMake || "",
      model: data.model || data.engineModel || "",
      firstReg: data.monthOfFirstRegistration || data.dateOfFirstRegistration || "",
      fuel: data.fuelType || "",
      color: data.colour || "",
      motStatus: data.motStatus || "",
      motExpiry: data.motExpiryDate || "",
      taxStatus: data.taxStatus || "",
      taxExpiry: data.taxDueDate || data.taxExpiredDate || data.taxExpiryDate || "",
    };
  } catch (error) {
    console.error("DVLA fetch error:", error);
    return null;
  }
}

// Fetch MOT history from DVSA API
async function fetchDVSAData(vrm: string, apiKey: string) {
  try {
    // DVSA uses simple API key authentication via x-api-key header
    const response = await fetch(`https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${vrm}`, {
      method: "GET",
      headers: {
        "Accept": "application/json+v6",
        "x-api-key": apiKey, // This is the main API key you need
      },
    });

    if (!response.ok) {
      console.error("DVSA API error:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("DVSA Response for", vrm, ":", JSON.stringify(data, null, 2));
    
    // Parse MOT history
    const motTests = data[0]?.motTests || [];
    const latestTest = motTests[0] || {};
    
    const history = motTests.slice(0, 5).map((test: any) => ({
      date: test.completedDate,
      mileage: test.odometerValue,
      result: test.testResult === "PASSED" ? "Pass" : "Fail",
      advisories: (test.rfrAndComments || [])
        .filter((item: any) => item.type === "ADVISORY")
        .map((item: any) => ({
          text: item.text,
          category: "General",
          estPricePence: 5000, // Default estimate
        })),
    }));

    // Extract current advisories from latest test - include both ADVISORY and DEFECT
    const advisories = (latestTest.rfrAndComments || [])
      .filter((item: any) => item.type === "ADVISORY" || item.type === "DEFECT")
      .map((item: any) => ({
        text: item.text,
        category: item.type === "DEFECT" ? "Critical" : (item.dangerous ? "Critical" : "General"),
        estPricePence: (item.type === "DEFECT" || item.dangerous) ? 15000 : 5000,
      }));

    return {
      mileage: latestTest.odometerValue || 0,
      history,
      advisories,
    };
  } catch (error) {
    console.error("DVSA fetch error:", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vrm = (body.vrm || "").toUpperCase().replace(/\s/g, "");

    if (!vrm) {
      return NextResponse.json({ error: "VRM required" }, { status: 400 });
    }

    // Get API keys from database
    const dvlaApiKey = await getApiKey("DVLA_API_KEY");
    const dvsaApiKey = await getApiKey("DVSA_API_KEY");

    // If API keys are configured, use real APIs; otherwise use mock data
    if (dvlaApiKey && dvsaApiKey) {
      try {
        const [dvlaData, dvsaData] = await Promise.all([
          fetchDVLAData(vrm, dvlaApiKey),
          fetchDVSAData(vrm, dvsaApiKey),
        ]);

        if (!dvlaData && !dvsaData) {
          return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
        }

        // Combine data from both APIs
        return NextResponse.json({
          vrm,
          make: dvlaData?.make || "Vehicle",
          model: dvlaData?.model || "",
          firstReg: dvlaData?.firstReg || "",
          fuel: dvlaData?.fuel || "",
          color: dvlaData?.color || "",
          motStatus: dvlaData?.motStatus || "Unknown",
          motExpiry: dvlaData?.motExpiry || new Date().toISOString().split("T")[0],
          taxStatus: dvlaData?.taxStatus || "Unknown",
          taxExpiry: dvlaData?.taxExpiry || null,
          mileage: dvsaData?.mileage || 0,
          history: dvsaData?.history || [],
          advisories: dvsaData?.advisories || [],
        });
      } catch (error) {
        console.error("Real API lookup error:", error);
        // Fall back to mock data on API error
      }
    }

    // Fallback to mock data if APIs not configured or API error
    console.log("Using mock data for VRM:", vrm);
    
    // Generate mock data based on VRM
    const mockVehicles: Record<string, any> = {
      "ABC123": {
        make: "TOYOTA",
        model: "PRIUS",
        firstReg: "2016-05-10",
        fuel: "Hybrid Petrol",
        color: "White",
        taxStatus: "Taxed",
        taxExpiry: "2026-06-30",
      },
      "DEF456": {
        make: "FORD",
        model: "FOCUS",
        firstReg: "2017-08-22",
        fuel: "Diesel",
        color: "Blue",
        taxStatus: "Taxed",
        taxExpiry: "2026-04-30",
      },
      "GHI789": {
        make: "VOLKSWAGEN",
        model: "GOLF TSI",
        firstReg: "2018-03-15",
        fuel: "Petrol",
        color: "Silver",
        taxStatus: "Taxed",
        taxExpiry: "2026-08-31",
      },
    };

    // Default mock vehicle
    const vehicleData = mockVehicles[vrm] || {
      make: "VOLKSWAGEN",
      model: "GOLF TSI",
      firstReg: "2018-03-22",
      fuel: "Petrol",
      color: "Silver",
      taxStatus: "Taxed",
      taxExpiry: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };

    return NextResponse.json({
      vrm,
      ...vehicleData,
      motStatus: "Valid",
      motExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      taxStatus: vehicleData.taxStatus || "Unknown",
      taxExpiry: vehicleData.taxExpiry || null,
      mileage: Math.floor(Math.random() * 40000 + 30000),
      history: [
        {
          date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          mileage: 35000,
          result: "Pass",
          advisories: [MOCK_ADVISORIES[0]],
        },
      ],
      advisories: [MOCK_ADVISORIES[0], MOCK_ADVISORIES[2]],
    });
  } catch (error) {
    console.error("Lookup/POST error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

