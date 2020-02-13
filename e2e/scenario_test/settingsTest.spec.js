const { setup, pump, cgm, match } = require('../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.launchLoop();
        await setup.loadScenarios(device.id);
        await cgm.add();
        await pump.add();
        await setup.loadScenario('Flat cgm');
    });
    afterAll(async () => {
        await cgm.remove();
        await pump.remove();
    });
    describe('Closed loop is not allowed', () => {
        describe('When correction range is not set', () => {
            afterAll(async () => {
                await cgm.removeData();
                await pump.removeData();
            });
            it('should not have correction range set', async () => {
                await pump.settings.CheckCorrectionRange(false);
            });
            it('should set the suspend threshold', async () => {
                await pump.settings.Suspend('130');
            });
            it('should set the basal rates', async () => {
                await pump.settings.BasalRates('0.1');
            });
            it('should set the delivery limits', async () => {
                await pump.settings.DeliveryLimits('0.5', '10.0');
            });
            it('should set the insulin model', async () => {
                await pump.settings.InsulinModel(pump.insulinModel.RapidAdults);
            });
            it('should set the carb ratios', async () => {
                await pump.settings.CarbRatios('8');
            });
            it('should set insulin sensitivites set', async () => {
                await pump.settings.InsulinSensitivities('500');
            });
            it('should toggle on closed loop', async () => {
                await setup.setClosedLoop();
            });
            it('should not be in closed loop mode', async () => {
                await expect(element(by.label('Waiting for first run').and(by.type('LoopUI.LoopCompletionHUDView')))).toExist();
            });
            it('should show configuration error that indicates why not in closed loop mode', async () => {
                await element(by.label('Waiting for first run').and(by.type('LoopUI.LoopCompletionHUDView'))).tap();
                await expect(match.accessible.Label('Configuration Error: Check Settings')).toExist();
                await match.accessible.Button('OK').tap();
            });
        });
    });
});

