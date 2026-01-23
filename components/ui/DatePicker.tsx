import { Calendar } from "react-native-calendars";
import { useState } from "react";
import {Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function DatePicker() {
  const [selected, setSelected] = useState({});

  return (
    <Calendar
      style={{
        marginTop: -height * 0.04,
        width: width * 0.85,
        height: height * 0.38,       
        alignSelf: "center",
        transform: [{ scale: 0.9 }]
      }}
      
      markingType={"period"}
      markedDates={selected}
      theme={{
        calendarBackground: 'transparent',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#dd99ee',
      }}

      hideExtraDays={true} 
      firstDay={1}

      onDayPress={(day) => {
        const newDate = {
          [day.dateString]: {
            startingDay: true,
            endingDay: true,
            color: "#0D47A1",
            textColor: "white",
          },
        };
        setSelected(newDate);
      }}
    />
  );
}
