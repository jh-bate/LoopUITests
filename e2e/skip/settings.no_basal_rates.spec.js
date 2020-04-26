const { Test, setting, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for basal rates', () => {
    var test;
    it('should without basal rates applied', async () => {
        test = new Test()
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withSettingsFilter([setting.type.BasalRates])
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    afterAll(async () => {
        await test.removeData();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopStatusInsulinAlert()
    });
});

