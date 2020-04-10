const { loop } = require('../../src/index');

describe('Bolus not given when settings are applied with correction ranges below suspend threshold', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('should launch loop', async () => {
        await loop.Launch();
    });
    it('should apply settings', async () => {
        let applySettings = loop.settings.default;
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '145' }];
        applySettings.SuspendThreshold = { value: '150' };
        await loop.Configure({
            scenario: 'flat_cgm_trace',
            settings: applySettings,
        });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        //TODO: confirm this??
        await loop.screens.home.ExpectLoopStatusCarbsAlert();
    });
    it('should only enter carbs', async () => {
        await loop.screens.carbEntry.Open();
        await loop.screens.carbEntry.SetCarbs('30');
    });
    it('should then only be given option to save without bolus and warn about predicted glucose', async () => {
        await loop.screens.carbEntry.ContinueToBolus();
        await loop.screens.carbEntry.ExpectPredictedGlucoseWarning('110 mg/dL');
        await loop.screens.carbEntry.SaveWithoutBolus();
    });
});
