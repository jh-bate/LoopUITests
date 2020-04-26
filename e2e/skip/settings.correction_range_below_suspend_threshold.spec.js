const { Test, setting } = require('../../src/index');

describe('Bolus not given when settings are applied with correction ranges below suspend threshold', () => {
    var test;
    it('should setup with correct configuration with delivery limits', async () => {
        let applySettings = setting.default;
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '145' }];
        applySettings.SuspendThreshold = { value: '150' };

        test = new Test()
            .withScenario('flat_cgm_trace')
            .withSettings(applySettings)
            .withStartScreen(screenName.settings)
        await test.prepare();
    });

    afterAll(async () => {
        await test.removeData();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        //TODO: confirm this??
        await test.homeScreen.ExpectLoopStatusCarbsAlert();
    });
    it('should only enter carbs', async () => {
        await test.carbEntryScreen.Open();
        await test.carbEntryScreen.SetCarbs('30');
    });
    it('should then only be given option to save without bolus and warn about predicted glucose', async () => {
        await test.carbEntryScreen.ContinueToBolus();
        await test.carbEntryScreen.ExpectPredictedGlucoseWarning('110 mg/dL');
        await test.carbEntryScreen.SaveWithoutBolus();
    });
});
