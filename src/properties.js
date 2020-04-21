
var target = {
    tidepool: 'tidepool',
    diy: 'diy',
};

var unit = {
    mmoll: 'mmol/L',
    mgdl: 'mg/dL',
};

var screenName = {
    settings: 'settings',
    home: 'home',
    bolus: 'bolus',
    carbEntry: 'carbEntry',
};

/**
 * @summary insulin activity model
 * @example InsulinModel.Fiasp
 */
var settingInsulinModel = {
    Walsh: 'Walsh',
    RapidAdults: 'Rapid-Acting – Adults',
    RapidChildren: 'Rapid-Acting – Children',
    Fiasp: 'Fiasp'
};

/**
 * @summary CGMModel that can be applied to the simulator
 */
var settingCGMModel = {
    Constant: 'Constant',
    SineCurve: 'Sine Curve',
    None: 'No Data'
};

/**
 * @summary Defaults that can be used to apply to all settings
 * @example await settings.Apply(SettingDefault)
 */
var settingDefault = {
    /**
     * @summary DeliveryLimits: { maxBolus: '10.0', maxBasalRate: '3.0' }
     */
    DeliveryLimits: { maxBolus: '10.0', maxBasalRate: '3.0' },
    /**
     * @summary BasalRates: [{ time: '12:00 AM', unitsPerHour: '0.1' }]
     */
    BasalRates: [{ time: '12:00 AM', unitsPerHour: '0.1' }],
    /**
     * @summary SuspendThreshold: { value: '75' }
     */
    SuspendThreshold: { value: '75' },
    /**
     * @summary InsulinModel: InsulinModel.RapidChildren
     */
    InsulinModel: settingInsulinModel.RapidChildren,
    /**
     * @summary CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }]
     */
    CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }],
    /**
     * @summary InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }]
     */
    InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }],
    /**
     * @summary  CorrectionRanges: [{ time: '12:00 AM', min: '140', max: '160' }]
     */
    CorrectionRanges: [{ time: '12:00 AM', min: '140', max: '160' }],
    /**
     * @summary  PreMealCorrectionRange: { min: '179', max: '180' }
     */
    PreMealCorrectionRange: { min: '80', max: '180' },
    /**
     *  @summary  ClosedLoop: true
     */
    ClosedLoop: true,
    /**
     *  @summary  AddCGMSimulator: true
     */
    AddCGMSimulator: true,
    /**
     *  @summary  AddPumpSimulator: true
     */
    AddPumpSimulator: true,
    /**
     * @summary  CGMSimulatorSettings: { modelData: { model: CGMModel.Constant, bgValues: ['142'] }, backfillHours: '3' }
     */
    CGMSimulatorSettings: { modelData: { model: settingCGMModel.Constant, bgValues: ['142'] }, backfillHours: '3' }
};

/**
 * @summary maps to Settings functions and is used to Filter functions when applying settings
 */
var settingType = {
    BasalRates: 'BasalRates',
    CarbRatios: 'CarbRatios',
    DeliveryLimits: 'DeliveryLimits',
    InsulinModel: 'InsulinModel',
    SuspendThreshold: 'SuspendThreshold',
    InsulinSensitivities: 'InsulinSensitivities',
    CorrectionRanges: 'CorrectionRanges',
    PreMealCorrectionRange: 'PreMealCorrectionRange',
    ClosedLoop: 'ClosedLoop',
    AddPumpSimulator: 'AddPumpSimulator',
    AddCGMSimulator: 'AddCGMSimulator',
    CGMSimulatorSettings: 'CGMSimulatorSettings'
};

/**
 * @summary CGMEffect that can be applied to the simulator
 */
var settingCGMEffect = {
    GlucoseNoise: 'Glucose Noise',
    RandomHighOutlier: 'Random High Outlier',
    RandomLowOutlier: 'Random Low Outlier',
    RandomError: 'Random Error'
};


var setting = {
    type: settingType,
    default: settingDefault,
    insulinModel: settingInsulinModel,
    cgmModel: settingCGMModel,
    cgmEffect: settingCGMEffect,
};


module.exports = {
    target,
    screenName,
    unit,
    setting
};
