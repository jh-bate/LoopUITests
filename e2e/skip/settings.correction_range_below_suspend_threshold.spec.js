const { LoopTest, setting, target } = require('../../src/index');

describe('Bolus not given when settings are applied with correction ranges below suspend threshold', () => {

    var loopTest;
    it('should setup with correct configuration with delivery limits', async () => {
        let applySettings = setting.default;
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '145' }];
        applySettings.SuspendThreshold = { value: '150' };

        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace')
            .withSettings(applySettings)
            .withStartScreen(screenName.settings)
            .build();
    });

    afterAll(async () => {
        await loopTest.removeData();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        //TODO: confirm this??
        await loopTest.homeScreen.ExpectLoopStatusCarbsAlert();
    });
    it('should only enter carbs', async () => {
        await loopTest.carbEntryScreen.Open();
        await loopTest.carbEntryScreen.SetCarbs('30');
    });
    it('should then only be given option to save without bolus and warn about predicted glucose', async () => {
        await loopTest.carbEntryScreen.ContinueToBolus();
        await loopTest.carbEntryScreen.ExpectPredictedGlucoseWarning('110 mg/dL');
        await loopTest.carbEntryScreen.SaveWithoutBolus();
    });
});
