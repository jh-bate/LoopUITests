const { Test, screenName, limits } = require('../../src/index');

describe('guardrail settings max bolus', () => {
    var test;
    it('should setup with correct configuration', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });

    it('cannot set above the maximum units', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.max.maximum + limits.delivery.bolus.unitIncrement,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set at max units with warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.max.maximum,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set at max lower boundary units with warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.max.lowerBoundary,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set under at max lower boundary units with no warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.max.lowerBoundary - limits.delivery.bolus.unitIncrement,
            maxBasalRate: '1.0'
        });
        //TODO assert NO warning
    });
    it('can above minimum units with no warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.min.minimum + limits.delivery.bolus.unitIncrement,
            maxBasalRate: '1.0'
        });
        //TODO assert NO warning
    });
    it('can set at minimum units with warning', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.min.minimum,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('cannot set below the minimum units', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: limits.delivery.bolus.min.minimum - limits.delivery.bolus.unitIncrement,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
});

