const { Test, screenName, limits } = require('../../src/index');

describe('guardrail settings max basal rate', () => {
    var test;
    it('should setup with correct configuration', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('set below maximum units with no warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.delivery.basal.max.maximum - limits.delivery.basal.unitIncrement
        });
        //TODO assert NO warning
    });

    it('set at maximum units with warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.delivery.basal.max.maximum
        });
        //TODO assert on warning
    });
    it('cannot above maximum', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.delivery.basal.max.maximum + limits.delivery.basal.unitIncrement
        });
        //TODO assert warning
    });
});

