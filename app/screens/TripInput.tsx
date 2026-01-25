// import { View, Text, FlatList, Pressable, ScrollView } from "react-native";
// import { useState } from "react";
// import TripSummaryEdit from "../../components/TripPlanScreen/TripSummaryEdit";
// import TripSummaryView from "../../components/TripPlanScreen/TripSummaryView";
// import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
// import type { TripSummaryItem } from "../../components/constants/types";

// const itineraryData = {
//     "itinerary": [
//         {
//             "day": 1,
//             "theme": "Old Quarter Charm & Street Food",
//             "youtube_query": "Hanoi Old Quarter street food tour vlog",
//             "activities": [
//                 {
//                     "time": "15:30",
//                     "activity_name": "Explore Hanoi Old Quarter & Hoan Kiem Lake",
//                     "description": "Walk through the 36 ancient streets and visit Ngoc Son Temple on the lake.",
//                     "cost_thb": 150,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1555944630-da23b7489fd4",
//                         "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a"
//                     ]
//                 },
//                 {
//                     "time": "18:30",
//                     "activity_name": "Street Food Walking Tour",
//                     "description": "Sample Bun Cha, Pho, and Egg Coffee at local hidden gems.",
//                     "cost_thb": 600,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a",
//                         "https://images.unsplash.com/photo-1528605105345-5344ea20e269"
//                     ]
//                 }
//             ],
//             "youtube_vlog_link": "https://www.youtube.com/watch?v=Pm5PavWKIos"
//         },
//         {
//             "day": 2,
//             "theme": "Temples & Traditional Arts",
//             "youtube_query": "Hanoi Temple of Literature and Water Puppet Show",
//             "activities": [
//                 {
//                     "time": "09:00",
//                     "activity_name": "Temple of Literature & Tran Quoc Pagoda",
//                     "description": "Visit Vietnam's first university and the oldest pagoda in Hanoi by the West Lake.",
//                     "cost_thb": 200,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1599708153386-62e250789360",
//                         "https://images.unsplash.com/photo-1583417319070-4a69db38a482"
//                     ]
//                 },
//                 {
//                     "time": "14:00",
//                     "activity_name": "Vietnam Museum of Ethnology",
//                     "description": "Learn about the 54 ethnic groups of Vietnam through cultural artifacts and traditional houses.",
//                     "cost_thb": 100,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
//                     ]
//                 },
//                 {
//                     "time": "17:00",
//                     "activity_name": "Thang Long Water Puppet Show",
//                     "description": "Experience a unique northern Vietnamese art form dating back to the 11th century.",
//                     "cost_thb": 300,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1578922746465-3a80a228f223"
//                     ]
//                 }
//             ],
//             "youtube_vlog_link": "https://www.youtube.com/watch?v=DwxylOqL2ZU"
//         },
//         {
//             "day": 3,
//             "theme": "Scenic Nature of Ninh Binh",
//             "youtube_query": "Ninh Binh Trang An boat tour guide",
//             "activities": [
//                 {
//                     "time": "08:00",
//                     "activity_name": "Trang An Landscape Complex Day Trip",
//                     "description": "A UNESCO site featuring limestone karsts and boat trips through water caves.",
//                     "cost_thb": 1800,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1528127269322-539801943592",
//                         "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57"
//                     ]
//                 },
//                 {
//                     "time": "12:30",
//                     "activity_name": "Departure Transfer to Airport",
//                     "description": "Private transfer from Ninh Binh/Hanoi to Noi Bai International Airport.",
//                     "cost_thb": 600,
//                     "activity_photos": [
//                         "https://images.unsplash.com/photo-1542296332-2e4473faf563"
//                     ]
//                 }
//             ],
//             "youtube_vlog_link": "https://www.youtube.com/watch?v=YMQXjge46aU"
//         }
//     ]
// }

// export default function TripInput() {
//     const [editMode, setEditMode] = useState(false);
//     console.log('editMode',editMode);
//     console.log('editModeset',setEditMode);

//     const [tripSummary, setTripSummary] = useState<TripSummaryItem[]>([]);

//     return (
//         <ScrollView className="bg-gray-50">
//             {/* Header */}
//             <View className="flex-row items-center justify-between px-4 pt-4">
//                 <Text className="text-xl font-bold">Trip Plan</Text>

//                 <Pressable onPress={() => setEditMode(!editMode)}>
//                     <Text className="font-semibold text-blue-600">
//                         {editMode ? "Done" : "Edit"}
//                     </Text>
//                 </Pressable>
//             </View>

//             {/* Summary */}
//             {editMode ? (
//                 <TripSummaryEdit
//                     editMode={editMode}
//                     setEditMode={setEditMode}
//                     data={tripSummary}
//                     onChange={setTripSummary}
//                 />
//             ) : (
            //     <TripSummaryView
            //         destination="China"
            //         from="19 Sep"
            //         to="25 Sep"
            //         travelType="Solo"
            //         people="1"
            //         budget="20000 THB"
            //         nationality="Thai"
            //         travelPlan="International"
            //     />
            // )}

//             {/* Itinerary */}
//             <ItineraryTimeline itinerary={itineraryData.itinerary} />
//         </ScrollView>
//     );
// }
