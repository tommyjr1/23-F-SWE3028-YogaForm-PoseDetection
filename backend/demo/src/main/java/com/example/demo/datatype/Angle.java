package main.java.com.example.demo.datatype;

public class Angle {
    private String value;
    // private String part;
    // private String check;

    public Angle() {

    }

    public Angle(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
    // public String getPart() {
    //     return part;
    // }

    public void setValue(String value) {
        this.value = value;
    }

    // public void setPart(String part) {
    //     this.part = part;
    // }

    @Override
    public String toString() {
        return "Angle{" +
                "value='" + value + '\'' +
                '}';
    }
}
