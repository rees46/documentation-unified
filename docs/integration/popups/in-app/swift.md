# Автоматический показ in-app попапов в iOS

SDK автоматически показывает in-app попапы. Если же вы хотите сделать свою логику отображения in-app, вы можете прикрепить собственный делегат к SDK:

```swift
import UIKit
import REES46

final class MainViewController: UIViewController, PopupPresentationDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Замените на ваш способ хранения инстанса SDK
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
        appDelegate.personalizationSDK?.popupPresentationDelegate = self
    }

    func sdk(_ sdk: PersonalizationSDK, shouldPresentPopup popup: Popup) -> UIViewController? {
        // Ваша кастомная логика тут
        // верните UIViewController с которого SDK покажет попап
        // или верните nil чтобы пропустить показ этого popup.
        return nil
    }

    deinit {
        // Замените на ваш способ хранения инстанса SDK
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate,
           appDelegate.personalizationSDK?.popupPresentationDelegate === self {
            appDelegate.personalizationSDK?.popupPresentationDelegate = nil
        }
    }
}
```