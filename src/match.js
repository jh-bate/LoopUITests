const element = require('detox').element;

const match = {
    /**
     * @summary items that have accessibility traits applied to them
     */
    accessible: {
        /**
         * @param {string} label
         * @returns {Detox.Element} ButtonBarButton
         */
        ButtonBarButton(label) {
            return element(by.label(label).and(by.traits(['button']).and(by.type('_UIButtonBarButton'))));
        },
        /**
         *
         * @param {string} label
         */
        DisabledButtonBarButton(label) {
            return element(by.label(label).and(by.traits(['button', 'disabled']).and(by.type('_UIButtonBarButton'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} LoopKitUI.SetupButton
         */
        SetupButton(label) {
            return element(by.label(label).and(by.traits(['button']).and(by.type('LoopKitUI.SetupButton'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} disabled LoopKitUI.SetupButton
         */
        DisabledSetupButton(label) {
            return element(by.label(label).and(by.traits(['button', 'disabled']).and(by.type('LoopKitUI.SetupButton'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityButton
         */
        Button(label) {
            return element(by.label(label).and(by.traits(['button'])));
        },
        /**
         * @param {string} label
         */
        DisabledButton(label) {
            return element(by.label(label).and(by.traits(['button', 'disabled'])));
        },
        /**
         * @param {string} theId
         * @returns {Detox.Element}
         */
        Id(theId) {
            return element(by.id(theId));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityBackButton
         */
        BackButton(label) {
            return element(by.label(label).and(by.traits(['button']).and(by.type('UIAccessibilityBackButtonElement'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityBackButton
         * @example await match.SwipeButton('some label').tap();
         */
        SwipeButton(label) {
            return element(by.label(label).and(by.traits(['button']).and(by.type('UISwipeActionStandardButton'))));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} accessibilityLabelText
         */
        Label(label) {
            return element(by.label(label).and(by.traits(['text'])));
        },
        /**
         * @param {string} text
         * @returns {Detox.Element} accessibilityHeader
         */
        Header(text) {
            return element(by.label(text).and(by.traits(['header'])));
        },
        /**
         * @param {string} label
         * @returns {Detox.Element} labeled element
         */
        UILabel(label) {
            return element(by.label(label).and(by.type('UILabel').and(by.traits(['text']))));
        },
        /**
         * @param {string} text
         * @returns {Detox.Element} accessibilityText
         */
        Text(text) {
            return element(by.text(text).and(by.traits(['text'])));
        },
        /**
         * @summary returns Picker
         * @param {Integer} pickerNumber
         * @returns {Detox.Element}
         */
        Picker(pickerNumber) {
            return element(
                by.type('UIPickerView')
                    .withAncestor(by.type('UITableViewCellContentView'))
            ).atIndex(pickerNumber);
        },
        /**
         * @summary returns Picker item(s) for given label and index
         * @param {Integer} pickerNumber
         * @param {string} itemLabel
         * @returns {Detox.Element}
         */
        PickerItem(pickerNumber, itemLabel) {
            return element(
                by.type('UILabel')
                    .and(by.label(itemLabel)
                        .and(by.traits(['text'])))
                    .withAncestor(
                        by.type('UIPickerTableViewTitledCell')
                            .withAncestor(
                                by.type('UIPickerColumnView')
                                    .withAncestor(
                                        by.type('UIPickerView')
                                    )
                            )
                    )).atIndex(pickerNumber);
        },
        /**
         * @summary sets the pickers column to the given value
         * @param {Integer} column
         * @param {string} strValue
         */
        SetPickerValue(column, strValue) {
            const currentPicker = 0;
            return element(
                by.type('UIPickerView')
            ).atIndex(currentPicker).setColumnToValue(column, strValue)
        },
        /**
         * @summary returns alert items based on the given label
         * @param {string} label
         * @returns {Detox.Element}
         */
        AlertLabel(label) {
            return element(by.label(label).and(by.traits(['text'])).withAncestor(by.type('_UIAlertControllerInterfaceActionGroupView')));
        },
        /**
         * @summary returns alert action item
         * @returns {Detox.Element}
         */
        AlertButton(label) {
            return element(by.label(label).and(by.traits(['button'])).and(by.type('_UIAlertControllerActionView')));
        },
        /**
         * @summary returns alert if found
         * @returns {Detox.Element}
         */
        Alert() {
            return element(by.type('_UIAlertControllerInterfaceActionGroupView'));
        },

    },
    loop: {
        /**
         * @summary returns the loop icon element that can be tapped to get current loop state details
         *
         * @example await match.loop.Icon().tap()
         */
        Icon() {
            return element(by.type('LoopUI.LoopCompletionHUDView'));
        },
        /**
         * @summary returns elements that relate to current loop state
         * 1st element has pump battery charge remaining e.g. `50%`
         *
         * @example await expect(match.loop.CompletionInfo()).toHaveLabel('50%')
         */
        CompletionInfo() {
            return element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopUI.LoopCompletionHUDView')));
        },
        /**
        * @summary returns elements that relate to pump battery info
        * 1st element has pump battery charge remaining e.g. `50%`
        *
        * @example await match.loop.BatteryLevelInfo()
        */
        BatteryLevelInfo() {
            return element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopKitUI.BatteryLevelHUDView')));
        },
        /**
         * @summary returns elements that relate to pump reservoir info
         * 1st element has units remaining e.g. `200U`
         * 2nd element has time detail e.g. `8:21 AM`
         *
         * @example await match.loop.ReservoirVolumeInfo()
         */
        ReservoirVolumeInfo() {
            return element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopKitUI.ReservoirVolumeHUDView')));
        },
        /**
         * @summary returns elements that relate to basal rate info
         * 1st element has time detail e.g. `8:21 AM`
         * 2nd element has the units e.g. `+0.0 U`
         *
         * @example await match.loop.BasalRateInfo()
         */
        BasalRateInfo() {
            return element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopUI.BasalRateHUDView')));
        },
        /**
         * @summary returns elements that relate to blood glucose info
         * 2nd element has value detail e.g. `110`
         * 3rd element has the units e.g. `mg/dL`
         * 4th element has time detail e.g. `8:21 AM`
         *
         * @example await match.loop.GlucoseInfo()
         */
        GlucoseInfo() {
            return element(by.type('UILabel').and(by.traits(['text'])).withAncestor(by.type('LoopUI.GlucoseHUDView')));
        },
    },
    /**
     * @summary get a non accessible UIEditableTextField
     * @returns {Detox.Element} UIEditableTextField
     */
    UIEditableTextField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    /**
     * @summary get text field for data entry
     * @returns {Detox.Element}
     */
    UITextField() {
        return element(by.type('UITextField'));
    },
};

module.exports = match;
