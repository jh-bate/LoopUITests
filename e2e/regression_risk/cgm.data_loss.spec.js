const { loop } = require('../../src/index');

describe.skip('Closed loop is stopped when we have cgm data loss', () => {
    let config = {
        scenario: 'flat_cgm_trace',
        settings: loop.settings.default,
    };
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('should setup with correct configuration', async () => {
        await loop.Launch()
        await loop.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loop.AdvanceScenario(config.scenario, '1');
    });
    it('should have no status alert', async () => {
        await loop.screens.home.ExpectSuccessfulLoop();
    });
    it('cgm data is turned off', async () => {
        await loop.screens.settings.SetCGMSimulatorSettings({ modelData: { bgValues: [], model: loop.settings.cgmModel.None } })
    });
    it('should have CGM data status alert', async () => {
        await loop.screens.home.ExpectLoopStatusGlucoseDataAlert();
    });
});
