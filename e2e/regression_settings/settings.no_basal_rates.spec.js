const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for basal rates', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without basal rates applied', async () => {
        await loop.Configure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.BasalRates])
        });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopStatusInsulinAlert()
    });
});

