const match = require('./match');
const text = require('./text');

class BolusScreen {
    /**
     * @example await bolus.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(text.bolusScreen.Bolus).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await bolus.Cancel();
     */
    async Cancel() {
        await this.CancelHeaderButton().tap();
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(text.general.Cancel);
    }
    /**
     * @example await bolus.Deliver();
     */
    async Deliver() {
        await this.DeliverButton().tap();
    }
    DeliverButton() {
        return match.accessible.Button(text.bolusScreen.Deliver);
    }
    DisabledDeliverButton() {
        return match.accessible.DisabledButton(text.bolusScreen.Deliver);
    }
    BolusHeader() {
        return match.accessible.Header(text.bolusScreen.Bolus);
    }
    BolusLabel() {
        return match.accessible.Label(text.bolusScreen.Bolus);
    }
    EnteredLabel() {
        return match.accessible.Label(text.bolusScreen.Entered);
    }
    RecommendedLabel() {
        return match.accessible.Label(text.bolusScreen.Recommended);
    }
    /**
     * @example await bolus.ExpectCannotDeliverBolus();
     */
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(text.bolusScreen.Deliver)).toExist();
    }
    /**
     * @param {number} units
     * @example await bolus.SetBolusAmount(10.5);
     */
    async SetBolusAmount(units) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
    /**
     * @example await bolus.SetAuthentication();
     */
    async SetAuthentication() {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
};

module.exports = { BolusScreen };
