const element = require('detox').element;
const match = require('./match');
const config = require('./config');

const { setting } = require('./properties');

class SettingsScreen {
    startAndReturnToSettings() {
        return {
            fromSettings: true,
            toSettings: true,
        }
    }
    constructor(language) {
        this.language = language;
    }
    async  _setCGMEffect(effect) {
        await match.accessible.Label(effect).tap();
        switch (effect) {
            case setting.cgmEffect.GlucoseNoise:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('100');
                await match.accessible.ButtonBarButton(this.language.general.Back).tap();
                break;
            case setting.cgmEffect.RandomError:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('10');
                await match.accessible.ButtonBarButton(this.language.general.Back).tap();
                break;
            default:
                break;
        }
    }
    async _setCGMModel(modelData) {
        if (modelData) {
            await match.accessible.Label(modelData.model).tap();
            switch (modelData.model) {
                case setting.cgmModel.Constant:
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                    await match.accessible.BackButton('CGM Settings').tap();
                    break;
                case setting.cgmModel.SineCurve:
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
    }
    async _setCGMBackfill(hours) {
        await match.accessible.Label('Backfill Glucose').tap();
        await match.accessible.Label('3 hr').tap();
        await match.accessible.BackButton('CGM Settings').tap();
    }
    async _exitSetting() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    async _selectPumpSimulator() {
        await match.accessible.Id('Simulator Small').tap();
    }
    async _selectCGMSimulator() {
        //TODO: we need to select by Id
        try {
            await match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(1).tap();
        } catch (err) {
            try {
                await match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(0).tap();
            } catch (err2) {
                await match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(2).tap();
            }
        }
    }
    async Open() {
        await match.accessible.ButtonBarButton(this.language.settingsScreen.Settings).tap();
    }
    async Close() {
        await this.DoneButton().tap();
    }
    DoneButton() {
        return match.accessible.ButtonBarButton(this.language.general.Done);
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.language.settingsScreen.Configuration);
    }
    ServicesHeader() {
        return match.accessible.Header(this.language.settingsScreen.Services);
    }
    PumpHeader() {
        return match.accessible.Header(this.language.settingsScreen.Pump);
    }
    ContinuousGlucoseMonitorHeader() {
        return match.accessible.Header(this.language.settingsScreen.ContinuousGlucoseMonitor);
    }
    SettingsHeader() {
        return match.accessible.Header(this.language.settingsScreen.Settings);
    }
    BasalRatesLabel() {
        return match.accessible.Label(this.language.settingsScreen.BasalRates)
    }
    SuspendThresholdLabel() {
        return match.accessible.Label(this.language.settingsScreen.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeliveryLimits)
    }
    InsulinModelLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(this.language.settingsScreen.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivities)
    }
    CorrectionRangeLabel() {
        return match.accessible.Label(this.language.settingsScreen.CorrectionRange);
    }
    ClosedLoopButton() {
        return match.accessible.Button(this.language.settingsScreen.ClosedLoop);
    }
    IssueReportLabel() {
        return match.accessible.Label(this.language.settingsScreen.IssueReport);
    }
    AddPumpLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddPump);
    }
    AddCGMLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddCGM);
    }
    async ScrollToBottom() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.Services)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(this.language.settingsScreen.Configuration).swipe('up', 'fast');
            await expect(match.accessible.Label(this.language.settingsScreen.Services)).toBeVisible();
        }
    }
    async ScrollToTop() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.Pump)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(this.language.settingsScreen.Configuration).swipe('down', 'fast');
            await expect(match.accessible.Label(this.language.settingsScreen.Pump)).toBeVisible();
        }
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  values list of settings that will not be applied
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
        await this.SetInsulinSensitivities(values.InsulinSensitivities, { fromSettings: true, toSettings: true });

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
     */
    async SetBasalRates(rates) {
        if (rates) {
            await this.BasalRatesLabel().tap();
            await expect(match.accessible.Header(this.language.settingsScreen.BasalRates)).toExist();
            for (let index = 0; index < rates.length; index++) {
                const rate = rates[index];
                await match.accessible.ButtonBarButton(this.language.general.Add).tap();
                await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
                await match.accessible.SetPickerValue(1, `${rate.unitsPerHour} ${config.basalRatesUnits}`);
            }
            await match.accessible.Label(this.language.settingsScreen.SaveToSimulator).tap();
            await this._exitSetting();
        }
    }
    /**
     * @summary set the suspend threshold in mg/dL
     * @param {object} threshold e.g. '150'
     */
    async SetSuspendThreshold(threshold) {
        if (threshold) {
            await this.SuspendThresholdLabel().tap();
            await match.UIEditableTextField().typeText(threshold.value);
            await expect(match.UIEditableTextField()).toHaveText(threshold.value);
            await this._exitSetting();
        }
    }
    /**
     * @param {object} limits { maxBasalRate string, maxBolus string }
     * @param {function} additionalExpectations optional, function executed before exiting if it exists
     */
    async SetDeliveryLimits(limits, additionalExpectations) {
        if (limits) {
            try {
                await this.DeliveryLimitsLabel().tap();
            } catch (error) {
                //sometimes there are multiples?
                await this.DeliveryLimitsLabel().atIndex(1).tap();
            }
            //TODO: using atIndex, need a better way to select these
            await match.UIEditableTextField().atIndex(0).clearText();
            await match.UIEditableTextField().atIndex(0).typeText(String(limits.maxBasalRate));
            await match.UIEditableTextField().atIndex(0).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(0)).toHaveText(String(limits.maxBasalRate));
            await match.UIEditableTextField().atIndex(1).clearText();
            await match.UIEditableTextField().atIndex(1).typeText(String(limits.maxBolus));
            await match.UIEditableTextField().atIndex(1).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(1)).toHaveText(String(limits.maxBolus));
            await match.accessible.Label(this.language.settingsScreen.SaveToSimulator).tap();
            if (additionalExpectations) {
                await additionalExpectations();
            }
            await this._exitSetting();
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
            await this._exitSetting();
        }
    }
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    */
    async SetCarbRatios(ratios) {
        if (ratios) {
            await this.CarbRatiosLabel().tap();
            for (let index = 0; index < ratios.length; index++) {
                const ratio = ratios[index];
                await match.accessible.ButtonBarButton(this.language.general.Add).tap();
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
            await this._exitSetting();
        }
    }
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @param {Object} properties
    * @param {boolean} properties.fromSettings
    * @param {boolean} properties.toSettings
    */
    async SetInsulinSensitivities(sensitivities, properties) {
        if (sensitivities) {
            if (properties && properties.fromSettings) {
                await this.ScrollToBottom();
                await this.InsulinSensitivitiesLabel().atIndex(1).tap();
            }
            for (let index = 0; index < sensitivities.length; index++) {
                const sensitivity = sensitivities[index];
                await match.accessible.ButtonBarButton(this.language.general.Add).tap();
                //select time unless this is the first Insulin Sensitivitiy we have set...
                if (sensitivity.time != "12:00 AM") {
                    await match.accessible.Label(`${sensitivity.time}`).atIndex(0).tap();
                }
                await match.accessible.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
            }
            await match.accessible.Label(this.language.general.Save).tap();

            if (properties && properties.toSettings) {
                await this._exitSetting();
                await this.ScrollToTop();
            }
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {Array} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     */
    async SetCorrectionRanges_v2(ranges) {
        const minimumColumn = 3;
        const maximumColumn = 1;
        if (ranges) {
            try {
                await this.CorrectionRangeLabel().tap();
            } catch (error) {
                await this.CorrectionRangeLabel().atIndex(0).tap();
            }
            await match.accessible.ButtonBarButton(this.language.general.Add).tap();
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(0).tap();
                await match.accessible.SetPickerValue(maximumColumn, range.max);
                await match.accessible.SetPickerValue(minimumColumn, range.min);
            }
            await match.accessible.Label(this.language.general.Save).tap();
            await this._exitSetting();
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {Array} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     */
    async SetCorrectionRanges(ranges) {
        if (ranges) {
            try {
                await this.CorrectionRangeLabel().tap();
            } catch (error) {
                await this.CorrectionRangeLabel().atIndex(0).tap();
            }
            await match.accessible.ButtonBarButton(this.language.general.Add).tap();
            let correctionRangePickerIndex = 0;
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(correctionRangePickerIndex).tap();
                let currentMax = config.correctionRangesMaximum;
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
            await match.accessible.Label(this.language.general.Save).tap();
            await this._exitSetting();
        }
    }
    /**
     * @param {Object} preMeal e.g. { min: '80', max: '150' };
     * @param {string} preMeal.min - the minimum value
     * @param {string} preMeal.max - the maximum value
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
            await match.accessible.Label(this.language.general.Save).tap();
            await this._exitSetting();
        }
    }
    async SetClosedLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        } catch (err) {
            await expect(this.ClosedLoopButton()).toHaveValue('0');
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        }
    }
    async SetOpenLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        } catch (err) {
            await expect(this.ClosedLoopButton()).toHaveValue('1');
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        }
    }
    async IssueReport() {
        await this.IssueReportLabel().tap();
        await expect(match.accessible.Header(this.language.settingsScreen.IssueReport)).toBeVisible();
        await this._exitSetting();
    }
    async AddCGMSimulator() {
        await this.AddCGMLabel().tap();
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
    }
    async RemoveCGM() {
        await this.ScrollToTop();
        await this._selectCGMSimulator();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).atIndex(1).tap();
    }
    async RemoveCGMData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(1).tap();
    }
    async AddPumpSimulator() {
        try {
            await this.AddPumpLabel().atIndex(1).tap();
        } catch (err) {
            await this.AddPumpLabel().atIndex(0).tap();
        }
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
        await match.accessible.Button(this.language.general.Continue).tap();
    }
    async RemovePump() {
        await this.ScrollToTop();
        await this._selectPumpSimulator();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePump).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePump).atIndex(1).tap();
    }
    async RemovePumpData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(1).tap();
    }
    /**
     * @summary set the cgm simulator effect
     * @param {Object} settings
     * @param {CGMEffect} settings.effect
     * @param {Object} settings.modelData
     * @param {CGMModel} settings.modelData.model
     * @param {Array} settings.modelData.bgValues
     * @param {string} settings.backfillHours
     */
    async SetCGMSimulatorSettings(settings) {
        if (settings) {
            await this.ScrollToTop();
            await this._selectCGMSimulator();
            if (settings.effect) {
                await this._setCGMEffect(settings.effect);
            }
            if (settings.modelData) {
                await this._setCGMModel(settings.modelData);
            }
            if (settings.backfillHours) {
                await this._setCGMBackfill(settings.backfillHours)
            }
            //TODO: multiple done buttons
            await this.DoneButton().atIndex(0).tap();
        }
    }
    async OpenIssueReport() {
        await this.IssueReportLabel().tap();
    }
    async CloseIssueReport() {
        await this._exitSetting();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    async DismissAlert() {
        await match.accessible.AlertButton(this.language.general.OK).tap();
    }
}

module.exports = {
    SettingsScreen
};
