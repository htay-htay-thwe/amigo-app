export const itineraryData = {
    "itinerary": [
        {
            "day": 1,
            "theme": "Old Quarter Charm & Street Food",
            "youtube_query": "Hanoi Old Quarter street food tour vlog",
            "activities": [
                {
                    "time": "15:30",
                    "activity_name": "Explore Hanoi Old Quarter & Hoan Kiem Lake",
                    "description": "Walk through the 36 ancient streets and visit Ngoc Son Temple on the lake.",
                    "cost_thb": 150,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1555944630-da23b7489fd4",
                        "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a"
                    ]
                },
                {
                    "time": "18:30",
                    "activity_name": "Street Food Walking Tour",
                    "description": "Sample Bun Cha, Pho, and Egg Coffee at local hidden gems.",
                    "cost_thb": 600,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a",
                        "https://images.unsplash.com/photo-1528605105345-5344ea20e269"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=Pm5PavWKIos"
        },
        {
            "day": 2,
            "theme": "Temples & Traditional Arts",
            "youtube_query": "Hanoi Temple of Literature and Water Puppet Show",
            "activities": [
                {
                    "time": "09:00",
                    "activity_name": "Temple of Literature & Tran Quoc Pagoda",
                    "description": "Visit Vietnam's first university and the oldest pagoda in Hanoi by the West Lake.",
                    "cost_thb": 200,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1599708153386-62e250789360",
                        "https://images.unsplash.com/photo-1583417319070-4a69db38a482"
                    ]
                },
                {
                    "time": "14:00",
                    "activity_name": "Vietnam Museum of Ethnology",
                    "description": "Learn about the 54 ethnic groups of Vietnam through cultural artifacts and traditional houses.",
                    "cost_thb": 100,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
                    ]
                },
                {
                    "time": "17:00",
                    "activity_name": "Thang Long Water Puppet Show",
                    "description": "Experience a unique northern Vietnamese art form dating back to the 11th century.",
                    "cost_thb": 300,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1578922746465-3a80a228f223"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=DwxylOqL2ZU"
        },
        {
            "day": 3,
            "theme": "Scenic Nature of Ninh Binh",
            "youtube_query": "Ninh Binh Trang An boat tour guide",
            "activities": [
                {
                    "time": "08:00",
                    "activity_name": "Trang An Landscape Complex Day Trip",
                    "description": "A UNESCO site featuring limestone karsts and boat trips through water caves.",
                    "cost_thb": 1800,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1528127269322-539801943592",
                        "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57"
                    ]
                },
                {
                    "time": "12:30",
                    "activity_name": "Departure Transfer to Airport",
                    "description": "Private transfer from Ninh Binh/Hanoi to Noi Bai International Airport.",
                    "cost_thb": 600,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1542296332-2e4473faf563"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=YMQXjge46aU"
        }
    ]
}

export const data = {
    "visa_requirements": {
        "visa_free": true,
        "visa_type": "Tourist Visa Exemption",
        "details": "Myanmar citizens are granted visa-free entry to Thailand for up to 14 days when entering via international airports."
    },
    "flights": [
        {
            "outbound_flight": {
                "airline": "Myanmar Airways International",
                "airline_logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Myanmar_Airways_International_logo.svg/512px-Myanmar_Airways_International_logo.svg.png",
                "flight_number": "8M335",
                "departure_airport": "RGN",
                "arrival_airport": "BKK",
                "departure_time": "2024-11-15T08:00:00",
                "arrival_time": "2024-11-15T09:45:00",
                "cost_thb": 2800
            },
            "return_flight": {
                "airline": "Myanmar Airways International",
                "airline_logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Myanmar_Airways_International_logo.svg/512px-Myanmar_Airways_International_logo.svg.png",
                "flight_number": "8M332",
                "departure_airport": "BKK",
                "arrival_airport": "RGN",
                "departure_time": "2024-11-17T19:15:00",
                "arrival_time": "2024-11-17T20:10:00",
                "cost_thb": 3100
            }
        }
    ],
    "accommodation": {
        "hotel_name": "Ibis Styles Bangkok Khaosan Viengtai",
        "address": "42 Rambuttri Road, Banglamphu, Bangkok 10200",
        "star_rating": 3,
        "total_cost_thb": 4200,
        "check_in": "Day 1",
        "check_out": "Day 3",
        "amenities": [
            "Free Wi-Fi",
            "Outdoor Pool",
            "Central Location",
            "Breakfast Included"
        ],
        "hotel_photos": [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
        ]
    }
};

export const planData = {
    "trip_plan": {
    "trip_id": "BKK-DOM-2026-001",
    "destination": "Bangkok",
    "nationality": "Thai",
    "travel_type": "domestic",
    "duration_days": 2,
    "budget_limit_thb": 13000,
    "from": "2026-02-02",
    "to": "2026-02-03",
    "people": "solo",
    "userPrompt": "Domestic trip to Bangkok for a Thai solo traveler.",
    "currency": "THB",
    "visa_requirements": {
      "visa_free": true,
      "visa_type": "None",
      "details": "Thai citizens do not require a visa for domestic travel within Thailand. Identification card is sufficient for check-in."
    },
    "flights": [
      {
        "airline": "Thai AirAsia",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_Logo.svg/512px-AirAsia_Logo.svg.png",
        "flight_number": "FD3438",
        "departure_airport": "CNX",
        "arrival_airport": "DMK",
        "departure_time": "2026-02-02T08:20:00",
        "arrival_time": "2026-02-02T09:35:00",
        "cost_thb": 1450
      },
      {
        "airline": "Thai AirAsia",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_Logo.svg/512px-AirAsia_Logo.svg.png",
        "flight_number": "FD3431",
        "departure_airport": "DMK",
        "arrival_airport": "CNX",
        "departure_time": "2026-02-03T20:50:00",
        "arrival_time": "2026-02-03T22:05:00",
        "cost_thb": 1600
      }
    ],
    "accommodation": {
      "hotel_name": "Riva Surya Bangkok",
      "address": "23 Phra Athit Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok 10200, Thailand",
      "star_rating": 4,
      "total_cost_thb": 4800,
      "check_in": "2026-02-02",
      "check_out": "2026-02-03",
      "amenities": [
        "Riverside View",
        "Outdoor Pool",
        "Free Wi-Fi",
        "Fitness Center"
      ],
      "hotel_photos": [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
      ]
    },
    "itinerary": [
      {
        "day": 1,
        "theme": "Riverside Heritage & Culture",
        "youtube_query": "Bangkok Riverside travel guide 2026",
        "activities": [
          {
            "time": "11:00",
            "activity_name": "The Grand Palace & Wat Phra Kaew",
            "description": "Visit the historic home of the Thai King and the Emerald Buddha.",
            "cost_thb": 500,
            "activity_photos": [
              "https://images.unsplash.com/photo-1562678662-f05d0ef9765b",
              "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d"
            ]
          },
          {
            "time": "15:00",
            "activity_name": "Wat Arun (Temple of Dawn)",
            "description": "Cross the river to see the iconic porcelain-encrusted spire.",
            "cost_thb": 100,
            "activity_photos": [
              "https://images.unsplash.com/photo-1528181304800-2f140819ad9c"
            ]
          },
          {
            "time": "19:00",
            "activity_name": "Dinner at Phra Athit Road",
            "description": "Enjoy local street food and boutique restaurants along the river.",
            "cost_thb": 600,
            "activity_photos": [
              "https://images.unsplash.com/photo-1559339352-11d035aa65de"
            ]
          }
        ]
      },
      {
        "day": 2,
        "theme": "Modern Bangkok & Shopping",
        "youtube_query": "Siam Paragon shopping vlog Bangkok",
        "activities": [
          {
            "time": "10:00",
            "activity_name": "Jim Thompson House Museum",
            "description": "Explore the beautiful teak house and art collection of the 'Silk King'.",
            "cost_thb": 200,
            "activity_photos": [
              "https://images.unsplash.com/photo-1583417319070-4a69db38a482"
            ]
          },
          {
            "time": "13:00",
            "activity_name": "Shopping at Siam Square & Paragon",
            "description": "Lunch and shopping in Bangkok's premier fashion district.",
            "cost_thb": 1500,
            "activity_photos": [
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
              "https://images.unsplash.com/photo-1565008447742-97f6f38c985c"
            ]
          },
          {
            "time": "17:00",
            "activity_name": "Erawan Shrine Visit",
            "description": "Pay respects at the famous Hindu shrine in the heart of the city.",
            "cost_thb": 0,
            "activity_photos": [
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
            ]
          }
        ]
      }
    ]
  },
  "id" : 123456,
  "created_at": "2024-06-15T10:00:00Z"
}


