// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can determine global (random) parameters here
// Declare your variables here



/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};

// compares the chosen answer to the value of `option1`
check_response = function(data, next) {
    $('input[name=answer]').on('change', function(e) {
        if (e.target.value === data.correct) {
            alert('Your answer is correct! Yey!');
        } else {
            alert('Sorry, this answer is incorrect :( The correct answer was ' + data.correct);
        }
        next();
    })
}


// hides the picture in SPR trials after the response is enabled

const handle_SPR_response_hide_picture = function(config, CT, babe, answer_container_generator, startingTime){

        const sentenceList = config.data[CT].sentence.trim().split(" | ");
        let spaceCounter = 0;
        let wordList;
        let readingTimes = [];

        // shows the sentence word by word on SPACE press
        const handle_key_press = function(e) {

            if (e.which === 32 && spaceCounter < wordList.length) {

                wordList[spaceCounter].classList.remove(
                    "spr-word-hidden"
                );

                if (spaceCounter === 0) {
                    $(".babe-help-text").addClass("babe-invisible");
                    // customization here: hide QUD and picture when finished reading
                    $(".babe-view-qud").addClass("babe-invisible");
                    $(".babe-view-stimulus").addClass("babe-invisible");
                    // $(".babe-view-stimulus-container").height(10);
                }

                if (spaceCounter > 0) {
                    wordList[spaceCounter - 1].classList.add(
                        "spr-word-hidden"
                    );
                }

                readingTimes.push(Date.now());
                spaceCounter++;

            } else if (
                e.which === 32 &&
                spaceCounter === wordList.length
            ) {

                wordList[spaceCounter - 1].classList.add(
                    "spr-word-hidden"
                );

                $(".babe-view").append(answer_container_generator(config, CT));

                $("input[name=answer]").on("change", function() {
                    const RT = Date.now() - startingTime;
                    let reactionTimes = readingTimes
                    .reduce((result, current, idx) => {
                        return result.concat(
                            readingTimes[idx + 1] - readingTimes[idx]
                        );
                    }, [])
                    .filter((item) => isNaN(item) === false);
                    let trial_data = {
                        trial_name: config.name,
                        trial_number: CT + 1,
                        response: $("input[name=answer]:checked").val(),
                        reaction_times: reactionTimes,
                        time_spent: RT
                    };

                    trial_data = babeUtils.view.save_config_trial_data(config.data[CT], trial_data);

                    babe.trial_data.push(trial_data);
                    babe.findNextView();
                });
                readingTimes.push(Date.now());
                spaceCounter++;
            }
        };
        // shows the help text
        $(".babe-help-text").removeClass("babe-nodisplay");

        // creates the sentence
        sentenceList.map((word) => {
            $(".babe-spr-sentence").append(
                `<span class='spr-word spr-word-hidden'>${word}</span>`
            );
        });

        // creates an array of spr word elements
        wordList = $(".spr-word").toArray();

        // attaches an eventListener to the body for space
        $("body").on("keydown", handle_key_press);

    }
