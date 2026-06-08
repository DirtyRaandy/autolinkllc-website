/*
 * cars-data.js — Auto-link LLC inventory
 *
 * Each car object represents a vehicle in `Cars/<folder>/`. To add a new car,
 * create the folder (with photos + Info.txt: VIN / Mileage / Price) and ask
 * the agent to re-run the import so this file is rebuilt.
 *
 * Notes:
 *  - `year` / `make` / `model` / `submodel` are derived from the VIN via the
 *    NHTSA vPIC API (https://vpic.nhtsa.dot.gov/). If the VIN's decoded year
 *    differs from the folder name's year, the VIN year wins.
 *  - `photos: []` triggers the "Photos coming soon" placeholder.
 *  - `noInfo: true` triggers the "Information coming soon" placeholder.
 *  - `sold: true` shows a SOLD badge on the card and sorts the vehicle to the end.
 *  - `description` is a short summary derived from the VIN (NHTSA vPIC decode).
 */

const CARS_DATA = [
  {
    id: "2008-mini-cooper-s-convertible",
    sourceFolder: "2008 Mini Cooper S",
    year: 2008,
    make: "MINI",
    model: "Cooper Convertible",
    submodel: "Cooper S",
    vin: "WMWRH33518TL96021",
    mileage: 91441,
    price: 7500,
    description: "A sporty 2008 MINI Cooper S Convertible with a turbocharged 1.6L 4-cylinder engine rated at 168 hp. This 2-door cabriolet delivers classic MINI character with open-air driving, assembled in Oxford, United Kingdom.",
    photoDir: "img/cars/2008-mini-cooper-s-convertible",
    photos: [],
    specs: {
      bodyClass: "Convertible / Cabriolet",
      engine: "1.6L 4-cylinder Gasoline",
      fuel: "Gasoline",
      drive: null,
      doors: 2,
      seats: null,
      plant: "Oxford, United Kingdom"
    },
    options: [
      "Cooper S Performance Package (turbocharged)",
      "Convertible Soft Top",
      "Sport-Tuned Suspension"
    ],
    noInfo: false
  },
  {
    id: "2009-mini-cooper-s",
    sourceFolder: "2009 Mini Cooper S",
    year: 2009,
    make: "MINI",
    model: "Cooper",
    submodel: "Cooper S",
    vin: "WMWMF73539TX40375",
    mileage: 137000,
    price: 7500,
    description: "This 2009 MINI Cooper S hatchback pairs turbocharged performance with iconic MINI styling. Powered by a 1.6L 4-cylinder engine making 175 hp, it offers a fun, efficient drive in a compact 2-door package.",
    photoDir: "img/cars/2009-mini-cooper-s",
    thumbnail: "20260509_130235.jpg",
    photos: [
      "20260509_130235.jpg",
      "20260509_130327.jpg",
      "20260509_130336.jpg",
      "20260509_130248.jpg",
      "20260509_130255.jpg",
      "20260509_130305.jpg",
      "20260509_130312.jpg",
      "20260509_130318.jpg",
      "20260509_125621.jpg",
      "20260509_125630.jpg",
      "20260509_125635.jpg",
      "20260509_125659.jpg",
      "20260509_125730.jpg"
    ],
    specs: {
      bodyClass: "Hatchback",
      engine: "1.6L 4-cylinder Turbocharged Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 2,
      seats: 4,
      plant: "Oxford, United Kingdom"
    },
    options: [
      "Cooper S Turbocharged Performance Package",
      "Sport Steering Wheel",
      "Premium Hi-Fi Sound System"
    ],
    noInfo: false
  },
  {
    id: "2011-infiniti-qx56",
    sourceFolder: "2011 Infiniti QX56",
    year: 2011,
    make: "INFINITI",
    model: "QX56",
    submodel: null,
    vin: "JN8AZ2NE6B9006060",
    mileage: 148781,
    price: 8400,
    description: "A luxurious 2011 Infiniti QX56 full-size SUV with a 5.6L V8 and 4WD. This 4-door SUV offers spacious seating, premium comfort, and confident capability for families and road trips.",
    photoDir: "img/cars/2011-infiniti-qx56",
    thumbnail: "20260509_132534.jpg",
    photos: [
      "20260509_132534.jpg",
      "20260509_132526.jpg",
      "20260509_132541.jpg",
      "20260509_132549.jpg",
      "20260509_132556.jpg",
      "20260509_132606.jpg",
      "20260509_132613.jpg",
      "20260509_132627.jpg",
      "20260509_132652.jpg",
      "20260509_132759.jpg",
      "20260509_133029.jpg"
    ],
    specs: {
      bodyClass: "Full-Size SUV",
      engine: "5.6L V8 VVEL Gasoline",
      fuel: "Gasoline",
      drive: "4WD / 4x4",
      doors: 4,
      seats: 7,
      plant: "Miyawaka, Japan"
    },
    options: [
      "4WD / 4x4",
      "Leather Seating",
      "3rd Row Seating",
      "Premium Audio",
      "Power Liftgate",
      "Navigation Ready"
    ],
    noInfo: false
  },
  {
    id: "2013-chevrolet-equinox-ls",
    sourceFolder: "2013 Chevy Equinox",
    year: 2013,
    make: "Chevrolet",
    model: "Equinox",
    submodel: "LS",
    vin: "2GNALBEK8D1255594",
    mileage: 149427,
    price: 4500,
    description: "A practical 2013 Chevrolet Equinox LS compact SUV with a fuel-efficient 2.4L Ecotec 4-cylinder engine and front-wheel drive. A reliable daily driver with comfortable seating for five and flexible cargo space.",
    photoDir: "img/cars/2013-chevrolet-equinox-ls",
    photos: [],
    specs: {
      bodyClass: "Compact SUV",
      engine: "2.4L 4-cylinder Ecotec Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Oshawa #2, Canada"
    },
    options: [
      "OnStar Capable",
      "Bluetooth Hands-Free",
      "Power Windows & Locks",
      "Cruise Control"
    ],
    noInfo: false
  },
  {
    id: "2013-hyundai-sonata-gls",
    sourceFolder: "2013 Hyundai Sonata",
    year: 2013,
    make: "Hyundai",
    model: "Sonata",
    submodel: "GLS",
    vin: "5NPEB4AC8DH657654",
    mileage: 132617,
    price: 1,
    priceNote: "Listed at $1 in Info.txt — please contact for actual price.",
    description: "This 2013 Hyundai Sonata GLS is a comfortable mid-size sedan with a 2.4L GDI 4-cylinder engine. Smooth highway manners, a roomy interior, and efficient performance make it a solid choice for commuters and families.",
    photoDir: "img/cars/2013-hyundai-sonata-gls",
    photos: [],
    specs: {
      bodyClass: "Sedan",
      engine: "2.4L 4-cylinder GDI Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Montgomery, Alabama, USA"
    },
    options: [
      "Bluetooth Hands-Free",
      "Power Driver Seat",
      "Steering-Wheel Audio Controls",
      "Cruise Control"
    ],
    noInfo: false
  },
  {
    id: "2013-mazda-5",
    sourceFolder: "2013 Mazda 5",
    year: 2012,
    yearNote: "Folder named 2013, but VIN decodes to a 2012 model — using VIN year.",
    make: "Mazda",
    model: "5",
    submodel: "Sport",
    vin: "JM1CW2BL5C0115776",
    mileage: 179500,
    price: 3200,
    description: "A versatile 2012 Mazda5 Sport with a 2.5L 4-cylinder engine and three rows of seating. Sliding rear doors and compact-MPV flexibility make it ideal for families who need space without a full-size van.",
    photoDir: "img/cars/2013-mazda-5",
    thumbnail: "20260509_131716.jpg",
    photos: [
      "20260509_131716.jpg",
      "20260509_131702.jpg",
      "20260509_131709.jpg",
      "20260509_131723.jpg",
      "20260509_131745.jpg",
      "20260509_131759.jpg",
      "20260509_131808.jpg",
      "20260509_131906.jpg",
      "20260509_131942.jpg",
      "20260509_131954.jpg"
    ],
    specs: {
      bodyClass: "Compact MPV / Minivan",
      engine: "2.5L 4-cylinder Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 6,
      plant: "Hiroshima, Japan"
    },
    options: [
      "Sport Trim",
      "Sliding Rear Doors",
      "3rd Row Seating",
      "Bluetooth Hands-Free",
      "Cruise Control"
    ],
    noInfo: false,
    sold: true
  },
  {
    id: "2014-chevrolet-equinox-ls",
    sourceFolder: "2014 Chevy Equinox",
    year: 2014,
    make: "Chevrolet",
    model: "Equinox",
    submodel: "LS",
    vin: "2GNALAEK2E1159942",
    mileage: 136753,
    price: 5500,
    description: "This 2014 Chevrolet Equinox LS offers dependable front-wheel drive in a compact SUV body. Its 2.4L Ecotec 4-cylinder engine balances efficiency and everyday usability with room for five.",
    photoDir: "img/cars/2014-chevrolet-equinox-ls",
    thumbnail: "20260509_140536.jpg",
    photos: [
      "20260509_140536.jpg",
      "20260509_140543.jpg",
      "20260509_140621.jpg",
      "20260509_140629.jpg",
      "20260509_140635.jpg",
      "20260509_140643.jpg",
      "20260509_140655.jpg",
      "20260509_140659.jpg"
    ],
    specs: {
      bodyClass: "Compact SUV",
      engine: "2.4L 4-cylinder Ecotec Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Oshawa #2, Canada"
    },
    options: [
      "OnStar Capable",
      "Bluetooth Hands-Free",
      "MyLink Touchscreen Ready",
      "Power Windows & Locks",
      "Cruise Control"
    ],
    noInfo: false
  },
  {
    id: "2015-volkswagen-jetta",
    sourceFolder: "2014 Volkswagen Jetta",
    year: 2015,
    yearNote: "Folder named 2014, but VIN decodes to a 2015 model — using VIN year.",
    make: "Volkswagen",
    model: "Jetta",
    submodel: "S",
    vin: "3VW1K7AJ6FM279052",
    mileage: 163351,
    price: 5500,
    description: "A 2015 Volkswagen Jetta S sedan with a 2.0L 4-cylinder engine and 5-speed manual transmission for drivers who want an engaging, connected drive. German-engineered quality in an efficient, easy-to-park package.",
    photoDir: "img/cars/2015-volkswagen-jetta",
    thumbnail: "20260509_141821.jpg",
    photos: [
      "20260509_141821.jpg",
      "20260509_1418028.jpg",
      "20260509_141815.jpg",
      "20260509_142025.jpg",
      "20260509_142034.jpg",
      "20260509_142041.jpg",
      "20260509_142047.jpg",
      "20260509_142053.jpg",
      "20260509_142101.jpg",
      "20260509_141808.jpg"
    ],
    specs: {
      bodyClass: "Sedan",
      engine: "2.0L 4-cylinder Gasoline",
      fuel: "Gasoline",
      transmission: "5-speed Manual",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Puebla, Mexico"
    },
    options: [
      "5-Speed Manual Transmission",
      "Bluetooth Hands-Free",
      "Power Windows & Locks",
      "Cruise Control"
    ],
    noInfo: false
  },
  {
    id: "2016-chevrolet-equinox-lt",
    sourceFolder: "2016 Chevy Equinox",
    year: 2016,
    make: "Chevrolet",
    model: "Equinox",
    submodel: "LT",
    vin: "2GNALCEK7G6232059",
    mileage: 144467,
    price: 7000,
    description: "This 2016 Chevrolet Equinox LT adds extra features to a proven compact SUV platform. The 2.4L Ecotec engine and front-wheel drive deliver solid mileage and comfortable road manners for daily use.",
    photoDir: "img/cars/2016-chevrolet-equinox-lt",
    thumbnail: "20260509_134223.jpg",
    photos: [
      "20260509_134223.jpg",
      "20260509_134230.jpg",
      "20260509_134236.jpg",
      "20260509_135125.jpg",
      "20260509_135324.jpg",
      "20260509_135340.jpg",
      "20260509_135347.jpg",
      "20260509_135418.jpg",
      "20260509_135427.jpg",
      "20260509_135437.jpg"
    ],
    specs: {
      bodyClass: "Compact SUV",
      engine: "2.4L 4-cylinder Ecotec Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "CAMI, Canada"
    },
    options: [
      "OnStar 4G LTE Wi-Fi Capable",
      "MyLink Touchscreen Infotainment",
      "Backup Camera",
      "Bluetooth Hands-Free",
      "Cruise Control",
      "Power Driver Seat"
    ],
    noInfo: false,
    sold: true
  },
  {
    id: "2016-chrysler-200-limited",
    sourceFolder: "2016 Chrysler 200",
    year: 2016,
    make: "Chrysler",
    model: "200",
    submodel: "Limited",
    vin: "1C3CCCAB6GN176722",
    mileage: 133893,
    price: 8000,
    description: "A refined 2016 Chrysler 200 Limited sedan with a 2.4L 4-cylinder engine and front-wheel drive. A stylish mid-size option with a comfortable cabin and modern design, built in Sterling Heights, Michigan.",
    photoDir: "img/cars/2016-chrysler-200-limited",
    photos: [],
    specs: {
      bodyClass: "Sedan",
      engine: "2.4L Tigershark MultiAir 4-cylinder Gasoline",
      fuel: "Gasoline",
      transmission: "9-speed Automatic",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Sterling Heights, Michigan, USA"
    },
    options: [
      "9-Speed Automatic Transmission",
      "Uconnect Touchscreen Infotainment",
      "Backup Camera",
      "Bluetooth Hands-Free",
      "Rotary E-Shifter",
      "Push-Button Start"
    ],
    noInfo: false
  },
  {
    id: "2017-hyundai-sonata-sport",
    sourceFolder: "2017 Hyundai Sonata",
    year: 2017,
    make: "Hyundai",
    model: "Sonata",
    submodel: "Sport",
    vin: "5NPE34AF6HH529183",
    mileage: 112833,
    price: 9500,
    description: "This 2017 Hyundai Sonata Sport adds athletic styling to a 2.4L GDI 4-cylinder platform rated at 187 hp. A well-equipped mid-size sedan with a comfortable ride and strong value for daily driving.",
    photoDir: "img/cars/2017-hyundai-sonata-sport",
    thumbnail: "20260509_133418.jpg",
    photos: [
      "20260509_133418.jpg",
      "20260509_133446.jpg",
      "20260509_133452.jpg",
      "20260509_133501.jpg",
      "20260509_133508.jpg",
      "20260509_133516.jpg",
      "20260509_133522.jpg",
      "20260509_133530.jpg",
      "20260509_133557.jpg",
      "20260509_133611.jpg",
      "20260509_133623.jpg"
    ],
    specs: {
      bodyClass: "Sedan",
      engine: "2.4L 4-cylinder GDI Gasoline",
      fuel: "Gasoline",
      drive: "FWD",
      doors: 4,
      seats: 5,
      plant: "Montgomery, Alabama, USA"
    },
    options: [
      "Sport Trim Package",
      "Touchscreen Infotainment",
      "Backup Camera",
      "Bluetooth Hands-Free",
      "Apple CarPlay / Android Auto",
      "Push-Button Start"
    ],
    noInfo: false
  },
  {
    id: "2017-jeep-compass-latitude",
    sourceFolder: "2017 Jeep Compass",
    year: 2017,
    make: "Jeep",
    model: "Compass",
    submodel: "Latitude",
    vin: "1C4NJDEB7HD100976",
    mileage: 104778,
    price: 8500,
    description: "A capable 2017 Jeep Compass Latitude with a 2.4L 4-cylinder engine making 172 hp and 4WD. This compact SUV combines Jeep attitude with everyday practicality and confidence in all weather.",
    photoDir: "img/cars/2017-jeep-compass-latitude",
    photos: [],
    specs: {
      bodyClass: "Compact SUV",
      engine: "2.4L Tigershark 4-cylinder Gasoline",
      fuel: "Gasoline",
      drive: "4WD / 4x4",
      doors: 4,
      seats: 5,
      plant: "Belvidere, Illinois, USA"
    },
    options: [
      "4WD / 4x4",
      "Latitude Trim Package",
      "Uconnect Touchscreen Infotainment",
      "Bluetooth Hands-Free",
      "Heated Front Seats Available",
      "Roof Rails"
    ],
    noInfo: false
  }
];

if (typeof window !== "undefined") {
  window.CARS_DATA = CARS_DATA;
}
