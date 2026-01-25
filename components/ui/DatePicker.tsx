import { Calendar } from "react-native-calendars";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

type Props = {
  markedDates: any;
  onSelectDate: (date: string) => void;
};

export default function DatePicker({ markedDates, onSelectDate }: Props) {
  return (
    <Calendar
      style={{
        marginTop: -height * 0.04,
        width: width * 0.85,
        height: height * 0.38,
        alignSelf: "center",
        transform: [{ scale: 0.9 }],
      }}
      markingType={"period"}
      markedDates={markedDates}
      hideExtraDays
      firstDay={1}
      onDayPress={(day) => {
        onSelectDate(day.dateString);
      }}
      theme={{ calendarBackground: 'transparent', textSectionTitleColor: '#b6c1cd', selectedDayBackgroundColor: '#00adf5', selectedDayTextColor: '#ffffff', todayTextColor: '#00adf5', dayTextColor: '#2d4150', textDisabledColor: '#dd99ee', }}
    />
  );
}
