const element = require('detox').element;
const match = require('./match');
const text = require('./text');

/**
 * @summary insulin activity model
 * @example InsulinModel.Fiasp
 */
var InsulinModel = {
    Walsh: 'Walsh',
    RapidAdults: 'Rapid-Acting – Adults',
    RapidChildren: 'Rapid-Acting – Children',
    Fiasp: 'Fiasp'
};

/**
 * @summary CGMModel that can be applied to the simulator
 */
var CGMModel = {
    Constant: 'Constant',
    SineCurve: 'Sine Curve',
    None: 'No Data'
};

/**
 * @summary Defaults that can be used to apply to all settings
 * @example await settings.Apply(SettingDefault)
 */
var SettingDefault = {
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
    InsulinModel: InsulinModel.RapidChildren,
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
    CGMSimulatorSettings: { modelData: { model: CGMModel.Constant, bgValues: ['142'] }, backfillHours: '3' }
};

/**
 * @summary maps to Settings functions and is used to Filter functions when applying settings
 */
var SettingType = {
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
var CGMEffect = {
    GlucoseNoise: 'Glucose Noise',
    RandomHighOutlier: 'Random High Outlier',
    RandomLowOutlier: 'Random Low Outlier',
    RandomError: 'Random Error'
};

/**
 * @summary filter out settings defaults for those that you don't want to apply
 * @param {object} values
 * @param {Array} types
 * @example FilterSettings(SettingDefault, [SettingType.SetBasalRates])
 * @returns filtered Defaults set
 */
var FilterSettings = function (values, types) {
    const filtered = values;
    if (types) {
        for (const type of types) {
            delete filtered[type];
        }
    }
    return filtered;
};


var _setCGMEffect = async function (effect) {
    await match.accessible.Label(effect).tap();
    switch (effect) {
        case CGMEffect.GlucoseNoise:
            await match.UIEditableTextField().clearText();
            await match.UIEditableTextField().typeText('100');
            await match.accessible.ButtonBarButton(text.general.Back).tap();
            break;
        case CGMEffect.RandomError:
            await match.UIEditableTextField().clearText();
            await match.UIEditableTextField().typeText('10');
            await match.accessible.ButtonBarButton(text.general.Back).tap();
            break;
        default:
            break;
    }
};

var _setCGMModel = async function (modelData) {
    if (modelData) {
        await match.accessible.Label(modelData.model).tap();
        switch (modelData.model) {
            case CGMModel.Constant:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            case CGMModel.SineCurve:
                await match.accessible.Label('Base Glucose').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.Label('Amplitude').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[1]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            default:
                break;
        }
    }
};
var _setCGMBackfill = async function (hours) {
    await match.accessible.Label('Backfill Glucose').tap();
    await match.accessible.Label('3 hr').tap();
    await match.accessible.BackButton('CGM Settings').tap();
};
var _exitSetting = async function () {
    await match.accessible.BackButton(text.settingsScreen.Settings).tap();
}
var _selectPumpSimulator = async function () {
    await match.accessible.Id('Simulator Small').tap();
}
var _selectCGMSimulator = async function () {
    //TODO: we need to select by Id
    try {
        await match.accessible.Label(text.settingsScreen.Simulator).atIndex(1).tap();
    } catch (err) {
        try {
            await match.accessible.Label(text.settingsScreen.Simulator).atIndex(0).tap();
        } catch (err2) {
            await match.accessible.Label(text.settingsScreen.Simulator).atIndex(2).tap();
        }
    }
}

class SettingsScreen {
    /**
     * @example await settings.Open();
     */
    async Open() {
        await match.accessible.ButtonBarButton(text.settingsScreen.Settings).tap();
    }
    /**
     * @example await settings.Close();
     */
    async Close() {
        await this.DoneButton().tap();
    }
    /**
     * @example settings.DoneButton();
     */
    DoneButton() {
        return match.accessible.ButtonBarButton(text.general.Done);
    }
    /**
     * @example settings.ConfigurationHeader();
     */
    ConfigurationHeader() {
        return match.accessible.Header(text.settingsScreen.Configuration);
    }
    /**
     * @example settings.ServicesHeader();
     */
    ServicesHeader() {
        return match.accessible.Header(text.settingsScreen.Services);
    }
    /**
     * @example settings.PumpHeader();
     */
    PumpHeader() {
        return match.accessible.Header(text.settingsScreen.Pump);
    }
    /**
     * @example settings.ContinuousGlucoseMonitorHeader();
     */
    ContinuousGlucoseMonitorHeader() {
        return match.accessible.Header(text.settingsScreen.ContinuousGlucoseMonitor);
    }
    /**
     * @example settings.SettingsHeader();
     */
    SettingsHeader() {
        return match.accessible.Header(text.settingsScreen.Settings);
    }
    BasalRatesLabel() {
        return match.accessible.Label(text.settingsScreen.BasalRates)
    }
    SuspendThresholdLabel() {
        return match.accessible.Label(text.settingsScreen.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        return match.accessible.Label(text.settingsScreen.DeliveryLimits)
    }
    InsulinModelLabel() {
        return match.accessible.Label(text.settingsScreen.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(text.settingsScreen.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(text.settingsScreen.InsulinSensitivities)
    }
    CorrectionRangeLabel() {
        return match.accessible.Label(text.settingsScreen.CorrectionRange);
    }
    ClosedLoopButton() {
        return match.accessible.Button(text.settingsScreen.ClosedLoop);
    }
    IssueReportLabel() {
        return match.accessible.Label(text.settingsScreen.IssueReport);
    }
    AddPumpLabel() {
        return match.accessible.Label(text.settingsScreen.AddPump);
    }
    AddCGMLabel() {
        return match.accessible.Label(text.settingsScreen.AddCGM);
    }
    async ScrollToBottom() {
        try {
            await expect(match.accessible.Label(text.settingsScreen.Services)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(text.settingsScreen.Configuration).swipe('up', 'fast');
            await expect(match.accessible.Label(text.settingsScreen.Services)).toBeVisible();
        }
    }
    async ScrollToTop() {
        try {
            await expect(match.accessible.Label(text.settingsScreen.Pump)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(text.settingsScreen.Configuration).swipe('down', 'fast');
            await expect(match.accessible.Label(text.settingsScreen.Pump)).toBeVisible();
        }
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  {SettingDefault} values list of settings that will not be applied
     * @example await settings.Apply(SettingDefault)
     */
    async Apply(values) {
        if (values.AddCGMSimulator) {
            await this.AddCGMSimulator();
        }
        if (values.AddPumpSimulator) {
            await this.AddPumpSimulator();
        }
        await this.SetCGMSimulatorSettings(values.CGMSimulatorSettings);
        await this.SetCorrectionRanges(values.CorrectionRanges);
        await this.SetSuspendThreshold(values.SuspendThreshold);
        await this.SetBasalRates(values.BasalRates);
        await this.SetDeliveryLimits(values.DeliveryLimits);
        await this.SetInsulinModel(values.InsulinModel);
        await this.SetCarbRatios(values.CarbRatios);
        await this.SetInsulinSensitivities(values.InsulinSensitivities);

        if (values.ClosedLoop) {
            if (values.ClosedLoop == true) {
                await this.SetClosedLoop();
            } else if (values.ClosedLoop == false) {
                await this.SetOpenLoop();
            }
        }
    }
    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     * @example await settings.SetBasalRates([{time:'12:00 AM', unitsPerHour:'0.1'},{time:'12:30 AM', unitsPerHour:'0.3'}])
     */
    async SetBasalRates(rates) {
        var _updatePickerItem = function (current) {
            current += 0.05;
            return Number(current.toFixed(2));
        }
        if (rates) {
            const unitsSuffix = 'U/hr';
            await this.BasalRatesLabel().tap();
            await expect(match.accessible.Header(text.settingsScreen.BasalRates)).toExist();
            let basalRatesPickerIndex = 0;
            for (let index = 0; index < rates.length; index++) {
                const rate = rates[index];
                await match.accessible.ButtonBarButton(text.general.Add).tap();
                if (index == 0) {
                    await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
                    var currentUnitsPerHour = 0.05;
                    do {
                        await match.accessible.PickerItem(basalRatesPickerIndex, `${currentUnitsPerHour} ${unitsSuffix}`).tap();
                        currentUnitsPerHour = _updatePickerItem(currentUnitsPerHour);
                    } while (currentUnitsPerHour <= rate.unitsPerHour);
                }
                basalRatesPickerIndex++;
            }
            await match.accessible.Label(text.settingsScreen.SaveToSimulator).tap();
            await _exitSetting();
        }
    }
    /**
     * @summary set the suspend threshold in mg/dL
     * @param {object} threshold e.g. '150'
     * @example await settings.SetSuspendThreshold({value:150});
     */
    async SetSuspendThreshold(threshold) {
        if (threshold) {
            await this.SuspendThresholdLabel().tap();
            await match.UIEditableTextField().typeText(threshold.value);
            await expect(match.UIEditableTextField()).toHaveText(threshold.value);
            await _exitSetting();
        }
    }
    /**
     * @param {object} limits { maxBasalRate string, maxBolus string }
     * @param {function} additionalExpectations optional, function executed before exiting if it exists
     * @example await settings.SetDeliveryLimits({maxBasalRate:'1.0', maxBolus:'10.0'}, checks)
     */
    async SetDeliveryLimits(limits, additionalExpectations) {
        if (limits) {
            await this.DeliveryLimitsLabel().tap();
            //TODO: using atIndex, need a better way to select these
            await match.UIEditableTextField().atIndex(0).clearText();
            await match.UIEditableTextField().atIndex(0).typeText(limits.maxBasalRate);
            await match.UIEditableTextField().atIndex(0).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(0)).toHaveText(limits.maxBasalRate);
            await match.UIEditableTextField().atIndex(1).clearText();
            await match.UIEditableTextField().atIndex(1).typeText(limits.maxBolus);
            await match.UIEditableTextField().atIndex(1).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(1)).toHaveText(limits.maxBolus);
            await match.accessible.Label(text.settingsScreen.SaveToSimulator).tap();
            if (additionalExpectations) {
                await additionalExpectations();
            }
            await _exitSetting();
        }
    }
    /**
     * @param {InsulinModel} model
     * @example await settings.SetInsulinModel(InsulinModel.Fiasp)
     */
    async SetInsulinModel(model) {
        if (model) {
            await this.InsulinModelLabel().tap();
            await match.accessible.Text(model).tap();
            await _exitSetting();
        }
    }
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    * @example await settings.SetCarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'},{time:'12:30 AM', carbGramsPerInsulinUnit:'7'}])
    */
    async SetCarbRatios(ratios) {
        if (ratios) {
            await this.CarbRatiosLabel().tap();
            for (let index = 0; index < ratios.length; index++) {
                const ratio = ratios[index];
                await match.accessible.ButtonBarButton(text.general.Add).tap();
                if (index == 0) {
                    await element(by.type('UITextField')).clearText();
                    await element(by.type('UITextField')).typeText(ratio.carbGramsPerInsulinUnit);
                    await expect(element(by.type('UITextField'))).toHaveText(ratio.carbGramsPerInsulinUnit);
                } else {
                    await element(by.type('UITextField').atIndex(index)).clearText();
                    await element(by.type('UITextField').atIndex(index)).typeText(ratio.carbGramsPerInsulinUnit);
                    await expect(element(by.type('UITextField').atIndex(index))).toHaveText(ratio.carbGramsPerInsulinUnit);
                }
            }
            await _exitSetting();
        }
    }
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @example await settings.SetInsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'},{time:'12:30 AM', bgValuePerInsulinUnit:'499'}])
    */
    async SetInsulinSensitivities(sensitivities) {
        if (sensitivities) {
            await this.ScrollToBottom();
            const unitsSuffix = 'mg/dL/U';
            await this.InsulinSensitivitiesLabel().atIndex(1).tap();
            for (let index = 0; index < sensitivities.length; index++) {
                const sensitivity = sensitivities[index];
                await match.accessible.ButtonBarButton(text.general.Add).tap();
                await match.accessible.Label(`${sensitivity.bgValuePerInsulinUnit} ${unitsSuffix}`).atIndex(1).tap();
            }
            await match.accessible.Label(text.general.Save).tap();
            await _exitSetting();
            await this.ScrollToTop();
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     * @example await settings.SetCorrectionRanges([{ time: '12:00 AM', min: '80', max: '150' },{ time: '12:30 AM', min: '80', max: '130' }])
     */
    async SetCorrectionRanges(ranges) {
        console.log('SetCorrectionRanges: ', ranges);
        if (ranges) {
            try {
                await this.CorrectionRangeLabel().tap();
            } catch (error) {
                await this.CorrectionRangeLabel().atIndex(0).tap();
            }
            await match.accessible.ButtonBarButton(text.general.Add).tap();
            let correctionRangePickerIndex = 0;
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(correctionRangePickerIndex).tap();
                let currentMax = 180;
                do {
                    await match.accessible.PickerItem(1, `${currentMax}`).tap();
                    currentMax--;
                } while (currentMax >= range.max);

                let currentMin = range.max;
                do {
                    if (currentMin == range.max) {
                        await match.accessible.PickerItem(4, `${currentMin}`).tap();
                    } else if (currentMin == (range.max - 1)) {
                        await match.accessible.PickerItem(2, `${currentMin}`).tap();
                    } else {
                        await match.accessible.PickerItem(1, `${currentMin}`).tap();
                    }
                    currentMin--;
                } while (currentMin >= range.min);
                correctionRangePickerIndex++;
            }
            await match.accessible.Label(text.general.Save).tap();
            await _exitSetting();
        }
    }
    /**
     * @param {Object} preMeal e.g. { min: '80', max: '150' };
     * @param {string} preMeal.min - the minimum value
     * @param {string} preMeal.max - the maximum value
     * @example await settings.SetPreMealCorrectionRange({ min: '80', max: '150' })
     */
    async SetPreMealCorrectionRange(preMeal) {
        if (preMeal) {
            const glucosePreMealOverridePickerColumns = {
                Label: 1,
                MinimumValue: 2,
                Separator: 3,
                MaximumValue: 4,
                Units: 5,
            };
            await this.CorrectionRangeLabel().tap();
            if (preMeal) {
                await match.accessible.Label('Pre-Meal').tap();
                await match.accessible.PickerItem(2, `${preMeal.max}`).tap();
                await match.accessible.PickerItem(2, `${preMeal.min}`).atIndex(glucosePreMealOverridePickerColumns.MinimumValue).tap(); //sets min
            }
            await match.accessible.Label(text.general.Save).tap();
            await _exitSetting();
        }
    }
    /**
     * @summary turn on closed loop mode
     */
    async SetClosedLoop() {
        await this.ScrollToTop();
        await this.ClosedLoopButton().tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        } catch (err) {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        }
    }
    /**
     * @summary set to open loop mode
     */
    async SetOpenLoop() {
        await this.ScrollToTop();
        await this.ClosedLoopButton().tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        } catch (err) {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        }
    }
    /**
     * @summary set to open loop mode
     * @example await settings.IssueReport();
     */
    async IssueReport() {
        await this.IssueReportLabel().tap();
        await expect(match.accessible.Header(text.settingsScreen.IssueReport)).toBeVisible();
        await _exitSetting();
    }
    /**
     * @summary add CGM Simulator
     */
    async AddCGMSimulator() {
        await this.AddCGMLabel().tap();
        await match.accessible.Button(text.settingsScreen.Simulator).tap();
    }
    /**
     * @summary Remove CGM
     */
    async RemoveCGM() {
        await this.ScrollToTop();
        await _selectCGMSimulator();
        await match.accessible.Label(text.settingsScreen.DeleteCGM).tap();
        await match.accessible.Label(text.settingsScreen.DeleteCGM).atIndex(1).tap();
    }
    /**
     * @summary Remove CGM Data
     */
    async RemoveCGMData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(text.settingsScreen.DeleteCGMData).atIndex(0).tap();
        await match.accessible.Label(text.settingsScreen.DeleteCGMData).atIndex(1).tap();
    }
    /**
     * @summary add Pump Simulator
     */
    async AddPumpSimulator() {
        try {
            await this.AddPumpLabel().atIndex(1).tap();
        } catch (err) {
            await this.AddPumpLabel().atIndex(0).tap();
        }
        await match.accessible.Button(text.settingsScreen.Simulator).tap();
        await match.accessible.Button(text.general.Continue).tap();
    }
    /**
     * @summary Remove Pump
     */
    async RemovePump() {
        await this.ScrollToTop();
        await _selectPumpSimulator();
        //TODO static text and not a button?
        await match.accessible.Label(text.settingsScreen.DeletePump).tap();
        await match.accessible.Label(text.settingsScreen.DeletePump).atIndex(1).tap();
    }
    /**
     * @summary Remove Pump Data
     */
    async RemovePumpData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(text.settingsScreen.DeletePumpData).atIndex(0).tap();
        await match.accessible.Label(text.settingsScreen.DeletePumpData).atIndex(1).tap();
    }
    /**
     * @summary set the cgm simulator effect
     * @param {object} settings
     * @param {CGMEffect} settings.effect
     * @param {object} settings.modelData
     * @param {CGMModel} settings.modelData.model
     * @param {Array} settings.modelData.bgValues
     * @param {string} settings.backfillHours
     */
    async SetCGMSimulatorSettings(settings) {
        if (settings) {
            await this.ScrollToTop();
            await _selectCGMSimulator();
            if (settings.effect) {
                await _setCGMEffect(settings.effect);
            }
            if (settings.modelData) {
                await _setCGMModel(settings.modelData);
            }
            if (settings.backfillHours) {
                await _setCGMBackfill(settings.backfillHours)
            }
            //TODO: multiple done buttons
            await this.DoneButton().atIndex(0).tap();
        }
    }
    async OpenIssueReport() {
        await this.IssueReportLabel().tap();
    }
    async CloseIssueReport() {
        await _exitSetting();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    async DismissAlert() {
        await match.accessible.AlertButton(text.general.OK).tap();
    }
}

module.exports = {
    SettingsScreen,
    FilterSettings,
    SettingDefault,
    SettingType,
    InsulinModel,
    CGMModel,
    CGMEffect
};
