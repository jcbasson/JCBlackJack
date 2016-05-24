define(
function () {
    function Card(){

        this.Name = "",
        this.Type = "",
        this.Class = "",
        this.SetClass = function () {

            if (this.Type && this.Name) {

                var classFirstPart = this.Type[0];

                var classSecondPart = this.Name;

                if (this.Name === "Ace" || 
                    this.Name === "Jack" ||
                    this.Name === "Queen" ||
                    this.Name === "King" ){
                    classSecondPart = this.Name[0];
                }
                
                this.Class = classFirstPart + classSecondPart;
            }
        }
        this.Value = function () {
                       
            if (this.Name) {

                var thisValue = this.Name;

                switch (this.Name) {
                    case "Ace":
                        thisValue = [1,10];
                        break;
                    case "Jack":
                        thisValue = 10
                        break;
                    case "Queen":
                        thisValue = 10
                        break;
                    case "King":
                        thisValue = 10
                        break;
                    default:
                        return thisValue
                }
                return thisValue;
            }
            return 0;
        }
    }
    Card.prototype.toString = function toString() {
        
        return this.Type + " of " + this.Name;
    }
    return Card;
});