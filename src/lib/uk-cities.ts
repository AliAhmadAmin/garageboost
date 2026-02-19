/**
 * List of UK cities and major towns for autocomplete
 */
export const UK_CITIES = [
  // England - Major Cities
  "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield", "Bristol",
  "Newcastle upon Tyne", "Nottingham", "Southampton", "Portsmouth", "Leicester",
  "Coventry", "Bradford", "Derby", "Plymouth", "Wolverhampton", "Stoke-on-Trent",
  "Brighton", "Hull", "Preston", "Reading", "Luton", "Middlesbrough", "Milton Keynes",
  "Sunderland", "Norwich", "Bournemouth", "Swindon", "Oxford", "Cambridge",
  "Peterborough", "York", "Ipswich", "Gloucester", "Exeter", "Bath", "Cheltenham",
  "Colchester", "Chelmsford", "Lincoln", "Salisbury", "Worcester", "Canterbury",
  "Durham", "Carlisle", "Chester", "Lancaster", "Winchester",
  
  // England - Additional Towns
  "Basingstoke", "Blackburn", "Blackpool", "Bolton", "Burnley", "Bury", "Chesterfield",
  "Crawley", "Darlington", "Doncaster", "Dudley", "Eastbourne", "Gillingham",
  "Grimsby", "Guildford", "Harrogate", "Hastings", "Hemel Hempstead", "Huddersfield",
  "Kidderminster", "King's Lynn", "Maidstone", "Mansfield", "Newcastle-under-Lyme",
  "Northampton", "Oldham", "Poole", "Rochdale", "Rotherham", "Slough", "Solihull",
  "Southend-on-Sea", "St Albans", "Stevenage", "Stockport", "Stockton-on-Tees",
  "Sutton Coldfield", "Tamworth", "Telford", "Wakefield", "Walsall", "Warrington",
  "Watford", "Wigan", "Woking", "Worthing", "Ashford", "Aylesbury", "Banbury",
  "Barrow-in-Furness", "Basingstoke", "Bedford", "Birkenhead", "Boston", "Bracknell",
  "Bridgwater", "Burnley", "Burton upon Trent", "Bury St Edmunds", "Chatham",
  "Crewe", "Dartford", "Ellesmere Port", "Farnborough", "Gateshead", "Gravesend",
  "Great Yarmouth", "Halifax", "Hartlepool", "High Wycombe", "Hinckley", "Kettering",
  "Leamington Spa", "Loughborough", "Lowestoft", "Macclesfield", "Margate", "Nuneaton",
  "Ramsgate", "Redditch", "Runcorn", "Scunthorpe", "Shrewsbury", "South Shields",
  "Stafford", "Stratford-upon-Avon", "Taunton", "Torquay", "Tunbridge Wells",
  "Warwick", "Weymouth", "Widnes", "Yeovil",
  
  // Scotland
  "Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness", "Paisley", "East Kilbride",
  "Livingston", "Hamilton", "Cumbernauld", "Kirkcaldy", "Dunfermline", "Ayr", "Perth",
  "Kilmarnock", "Greenock", "Coatbridge", "Glenrothes", "Airdrie", "Falkirk",
  "Stirling", "Motherwell", "Dumfries", "Elgin", "Dumbarton", "Fort William",
  "Oban", "St Andrews",
  
  // Wales
  "Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Merthyr Tydfil", "Neath",
  "Port Talbot", "Cwmbran", "Bridgend", "Llanelli", "Caerphilly", "Rhondda",
  "Bangor", "Aberystwyth", "Carmarthen", "Colwyn Bay", "Holyhead", "Llandudno",
  "Pontypridd", "Ebbw Vale", "Aberdare", "Pontypool", "Maesteg", "Penarth",
  
  // Northern Ireland
  "Belfast", "Derry", "Lisburn", "Newry", "Bangor", "Craigavon", "Castlereagh",
  "Ballymena", "Newtownabbey", "Carrickfergus", "Coleraine", "Omagh", "Larne",
  "Banbridge", "Antrim", "Enniskillen", "Armagh", "Dungannon", "Cookstown",
  "Downpatrick", "Ballymoney", "Limavady", "Strabane", "Magherafelt", "Portrush",
].sort();

/**
 * Filter cities based on search term
 */
export function searchCities(query: string, limit = 10): string[] {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  
  // Exact matches first, then starts with, then contains
  const exactMatches = UK_CITIES.filter(city => 
    city.toLowerCase() === lowerQuery
  );
  
  const startsWithMatches = UK_CITIES.filter(city => 
    city.toLowerCase().startsWith(lowerQuery) && !exactMatches.includes(city)
  );
  
  const containsMatches = UK_CITIES.filter(city => 
    city.toLowerCase().includes(lowerQuery) && 
    !exactMatches.includes(city) && 
    !startsWithMatches.includes(city)
  );
  
  return [...exactMatches, ...startsWithMatches, ...containsMatches].slice(0, limit);
}
