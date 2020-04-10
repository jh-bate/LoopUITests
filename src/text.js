var General = {
    Cancel: 'Cancel',
    Continue: 'Continue',
    Done: 'Done',
    Save: 'Save',
    Back: 'Back',
    Add: 'Add',
    Edit: 'Edit',
    Status: 'Status',
    OK: 'OK',
};


var HomeScreen = {
    ActiveCarbohydrates: 'Active Carbohydrates',
    ActiveInsulin: 'Active Insulin',
    InsulinDelivery: 'Insulin Delivery',
    Glucose: 'Glucose',
    LoopWaitingForFirstRun: 'Waiting for first run'
};

var CarbEntryScreen = {
    AddMeal: 'Add Meal',
    SaveWithoutBolusing: 'Save without Bolusing',
    AddCarbEntry: 'Add Carb Entry',
    AmountConsumed: 'Amount Consumed',
    Date: 'Date',
    FoodType: 'Food Type',
    AbsorptionTime: 'Absorption Time',
    AbsorptionMessage: 'Choose a longer absorption time for larger meals, or those containing fats and proteins. This is only guidance to the algorithm and need not be exact.'
};

var BolusScreen = {
    Bolus: 'Bolus',
    Deliver: 'Deliver',
    Recommended: 'Recommended',
    Entered: 'Entered'
};

var TempOverrideScreen = {
    WorkoutTargets: 'Workout Targets',
    TemporaryOverride: 'Temporary Override',
    Symbol: 'Symbol',
    Name: 'Name',
    Recommended: 'Recommended',
    CustomPreset: 'Custom Preset',
    AddPresetMessage: "Tap '+' to create a new custom preset."
};

var SettingsScreen = {
    Settings: 'Settings',
    Configuration: 'CONFIGURATION',
    Services: 'SERVICES',
    ContinuousGlucoseMonitor: 'CONTINUOUS GLUCOSE MONITOR',
    Pump: 'PUMP',
    AddService: 'Add Service',
    Simulator: 'Simulator',
    IssueReport: 'Issue Report',
    BasalRates: 'Basal Rates',
    SaveToSimulator: 'Save to simulator',
    DeliveryLimits: 'Delivery Limits',
    InsulinSensitivities: 'Insulin Sensitivities',
    SuspendThreshold: 'Suspend Threshold',
    CorrectionRange: 'Correction Range',
    InsulinModel: 'Insulin Model',
    CarbRatios: 'Carb Ratios',
    ClosedLoop: 'Closed Loop',
    AddCGM: 'Add CGM',
    DeleteCGMData: 'Delete CGM Data',
    DeleteCGM: 'Delete CGM',
    AddPump: 'Add Pump',
    DeletePump: 'Delete Pump',
    DeletePumpData: 'Delete Pump Data'
};

var Alerts = {
    MissingCarbEffects: 'Missing Data: Carb Effects',
    MissingInsulinEffects: 'Missing Data: Insulin Effects',
    ConfigurationError: 'Configuration Error: Check Settings',
    MissingGlucoseData: 'Missing Data: Glucose Data Not Available'
};

var text = {
    alerts: Alerts,
    general: General,
    bolusScreen: BolusScreen,
    carbEntryScreen: CarbEntryScreen,
    settingsScreen: SettingsScreen,
    overridesScreen: TempOverrideScreen,
    homeScreen: HomeScreen
};

module.exports = text;
