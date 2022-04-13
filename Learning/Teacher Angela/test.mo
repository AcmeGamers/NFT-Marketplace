import Debug from "mo:base/Debug";

actor DBank {
    // Assigns Basic Value
    var currentValue = 100;

    // Requires := to reassign a Value
    currentValue := 140;

    // Let variables are immutable, like const
    let id = 123921481293921;

    // To print text
    Debug.print("DBank");
    
    // To print numbers
    Debug.print(debug_show(currentValue));
    // Dwarf.log("DBank.currentValue = " + currentValue);
}
