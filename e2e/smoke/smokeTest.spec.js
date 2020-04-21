const { LoopTest, target, setting } = require('../../src/index');

describe('smoke test', () => {
    var loopTest;
    beforeAll(async () => {
        loopTest = await new LoopTest.Builder(target.tidepool).build();
    });
    describe('home screen', () => {
        it('has Active Carbohydrates section', async () => {
            await loopTest.homeScreen.OpenActiveCarbohydratesChart();
            await loopTest.homeScreen.CloseChart();
        });
        it('has Active Insulin section', async () => {
            await loopTest.homeScreen.OpenActiveInsulinChart();
            await loopTest.homeScreen.CloseChart();
        });
        it('has Insulin Delivery section', async () => {
            await loopTest.homeScreen.OpenInsulinDeliveryChart();
            await loopTest.homeScreen.CloseChart();
        });
        it('has Glucose section', async () => {
            await loopTest.homeScreen.OpenGlucoseChart();
            await loopTest.homeScreen.CloseChart();
        });
        it('has Loop icon', async () => {
            await loopTest.homeScreen.ExpectLoopNotYetRun();
        });
        it('has Loop icon has alert when not setup', async () => {
            await loopTest.homeScreen.ExpectLoopStatusGlucoseDataAlert();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loopTest.settingsScreen.Open();
        });
        afterAll(async () => {
            await loopTest.settingsScreen.Close();
        });
        describe('general', () => {
            it('set to closed loop', async () => {
                await loopTest.settingsScreen.SetClosedLoop();
            });
            it('set to open loop', async () => {
                await loopTest.settingsScreen.SetOpenLoop();
            });
            it('open issue report', async () => {
                await loopTest.settingsScreen.OpenIssueReport();
            });
            it('close issue report', async () => {
                await loopTest.settingsScreen.CloseIssueReport();
            });
        });
        describe('cgm', () => {
            it('can be added', async () => {
                await loopTest.settingsScreen.AddCGMSimulator();
            });
            it('can configure simulator', async () => {
                await loopTest.settingsScreen.SetCGMSimulatorSettings(setting.default.CGMSimulatorSettings);
            });
        });
        describe('pump', () => {
            it('can be added', async () => {
                await loopTest.settingsScreen.AddPumpSimulator();
            });
            it('set suspend threshold', async () => {
                await loopTest.settingsScreen.SetSuspendThreshold(setting.default.SuspendThreshold);
            });
            it('set basal rates', async () => {
                await loopTest.settingsScreen.SetBasalRates(setting.default.BasalRates);
            });
            it('set delivery limits', async () => {
                await loopTest.settingsScreen.SetDeliveryLimits(setting.default.DeliveryLimits);
            });
            it('set insulin model', async () => {
                await loopTest.settingsScreen.SetInsulinModel(setting.default.InsulinModel);
            });
            it('set carb ratios', async () => {
                await loopTest.settingsScreen.SetCarbRatios(setting.default.CarbRatios);
            });
            it('set insulin sensitivites', async () => {
                await loopTest.settingsScreen.SetInsulinSensitivities(setting.default.InsulinSensitivities);
            });
            it('set correction range', async () => {
                await loopTest.settingsScreen.SetCorrectionRanges([{ time: '12:00 AM', min: '150', max: '170' }]);
            });
        });
    });
    describe('carb entry', () => {
        it('open dialog', async () => {
            await loopTest.carbEntryScreen.Open();
        });
        it('cancel dialog', async () => {
            await loopTest.carbEntryScreen.Cancel();
        });
        it('set carbs and save without a bolus', async () => {
            await loopTest.carbEntryScreen.Open();
            await loopTest.carbEntryScreen.SetCarbs('30');
            await loopTest.carbEntryScreen.ContinueToBolus();
            await loopTest.carbEntryScreen.SaveWithoutBolus();
        });
    });
    //TODO: skipped until we can interact
    describe.skip('bolus', () => {

        it('open dialog', async () => {
            await loopTest.bolusScreen.Open();
        });
        it('cancel dialog', async () => {
            await loopTest.bolusScreen.Cancel();
        });
    });
    describe.skip('cleanup', () => {
        it('open settings', async () => {
            await loopTest.settingsScreen.Open();
        });
        it('remove pump data', async () => {
            await loopTest.settingsScreen.RemovePumpData();
        });
        it('remove pump', async () => {
            await loopTest.settingsScreen.RemovePump();
        });
        it('remove CGM data', async () => {
            await loopTest.settingsScreen.RemoveCGMData();
        });
        it('remove CGM', async () => {
            await loopTest.settingsScreen.RemoveCGM();
        });
        it('close settings', async () => {
            await loopTest.settingsScreen.Close();
        });
    });
});
