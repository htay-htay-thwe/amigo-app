import StepIndicator from 'react-native-step-indicator';


const PRIMARY_BLUE = "#0D47A1";

const customStyles = {
    // circle border
    stepStrokeCurrentColor: PRIMARY_BLUE,
    stepStrokeFinishedColor: PRIMARY_BLUE,
    stepStrokeUnFinishedColor: PRIMARY_BLUE,

    // circle fill
    stepIndicatorCurrentColor: "#FFFFFF",
    stepIndicatorFinishedColor: PRIMARY_BLUE,
    stepIndicatorUnFinishedColor: "#647EA6",

    // number color
    stepIndicatorLabelCurrentColor: PRIMARY_BLUE,
    stepIndicatorLabelFinishedColor: "#FFFFFF",
    stepIndicatorLabelUnFinishedColor: "#EAEAEA",

    // line between steps
    separatorFinishedColor: PRIMARY_BLUE,
    separatorUnFinishedColor: PRIMARY_BLUE,

    currentStepLabelColor: PRIMARY_BLUE,

    // sizes (adjust if needed)
    stepIndicatorSize: 36,
    currentStepIndicatorSize: 45,
    currentStepStrokeWidth: 6,
    currentStepIndicatorLabelFontSize: 20,

};

type Props = {
    currentStep?: number;
};

export default function StepIndicatorComponent({
    currentStep = 1
}: Props) {

    return (
        <StepIndicator
            stepCount={6}
            currentPosition={currentStep - 1}
            customStyles={customStyles}
        />
    );
}