const { loop, setting, screenName } = require('../../src/index');

describe.skip('Closed loop is stopped when we have cgm data loss', () => {
    var test;
    afterAll(async () => {
        await test.removeData();
    });
    it('should setup with correct configuration', async () => {
        test = new test()
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withStartScreen(screenName.home);
        await test.prepare();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await test.advanceScenario('1');
    });
    it('should have no status alert', async () => {
        await test.homeScreen.ExpectSuccessfulLoop();
    });
    it('cgm data is turned off', async () => {
        await test.settingsScreen.SetCGMSimulatorSettings({ modelData: { bgValues: [], model: loop.settings.cgmModel.None } })
    });
    it('should have CGM data status alert', async () => {
        await test.homeScreen.ExpectLoopStatusGlucoseDataAlert();
    });
});
