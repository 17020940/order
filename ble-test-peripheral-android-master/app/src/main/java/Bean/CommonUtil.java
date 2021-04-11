package Bean;

import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;

public class CommonUtil {
    public static String getMoneyCurrency(Double money){
        Locale vietnamese = new Locale("vi", "VN");
        Currency vnd = Currency.getInstance(vietnamese);
        NumberFormat dollarFormat = NumberFormat.getCurrencyInstance(vietnamese);
        return dollarFormat.format(money);
    }
}
