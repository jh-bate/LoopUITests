const { Test, setting, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for delivery limits', () => {
    var test;
    it('should without delivery limits applied', async () => {
        test = new Test()
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withSettingsFilter([setting.type.DeliveryLimits])
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopStatusConfigurationAlert();
    });
});

