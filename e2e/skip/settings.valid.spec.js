const { Test, setting, screenName } = require('../../src/index');

describe.skip('Closed loop is allowed when', () => {
    var test;
    it('should launch with all settings applied', async () => {
        loopTest = new Test()
            .withScenario('flat_cgm_trace_with_basal')
            .withSettings(setting.default)
            .withStartScreen(screenName.home);

        await test.prepare();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loop.advanceScenario('1');
    });
    it('should have no status alert', async () => {
        await test.homeScreen.ExpectSuccessfulLoop();
    });
});
