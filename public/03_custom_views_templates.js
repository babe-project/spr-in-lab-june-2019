// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the babe-object as input
// and has to call babe.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call babe.trial_data.push(trial_data) to save the trial information

const multiple_dropdown = function(config) {
    const multi_dropdown_function = {
        name: config.name,
        title: babeUtils.view.setter.title(config.title, ""),
        render: function(CT, babe) {
            console.log(config.data[CT]);
            let startingTime;
            const QUD = babeUtils.view.setter.QUD(config.QUD);
            const sentence_chunk_1 = config.data[CT].sentence_chunk_1;
            const sentence_chunk_2 = config.data[CT].sentence_chunk_2;
            const answer_option_1_1 = config.data[CT].choice_options_1[0];
            const answer_option_1_2 = config.data[CT].choice_options_1[1];
            const answer_option_2_1 = config.data[CT].choice_options_2[0];
            const answer_option_2_2 = config.data[CT].choice_options_2[1];
            const answer_option_2_3 = config.data[CT].choice_options_2[2];
            const answer_option_3_1 = config.data[CT].choice_options_3[0];
            const answer_option_3_2 = config.data[CT].choice_options_3[1];
            const answer_option_3_3 = config.data[CT].choice_options_3[2];
            const answer_option_3_4 = config.data[CT].choice_options_3[3];
            const viewTemplate = `<div class='babe-view'>
                <h1 class='babe-view-title'>${this.title}</h1>
                <p class='babe-view-question babe-view-qud'>${QUD}</p>
                <div class='babe-view-stimulus-container'>
                    <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;

            const answerContainerElem_Type_A = `<div class='babe-view-answer-container babe-response-dropdown'>
                <select id='response1' name='answer_1'>
                    <option disabled selected></option>
                    <option value=${answer_option_1_1}>${answer_option_1_1}</option>
                    <option value=${answer_option_1_2}>${answer_option_1_2}</option>
                </select>
                ${sentence_chunk_1}
                <select id='response2' name='answer_2'>
                    <option disabled selected></option>
                    <option value=${answer_option_2_1}>${answer_option_2_1}</option>
                    <option value=${answer_option_2_2}>${answer_option_2_2}</option>
                    <option value=${answer_option_2_3}>${answer_option_2_3}</option>
                </select>
                ${sentence_chunk_2}
                <select id='response3' name='answer_3'>
                    <option disabled selected></option>
                    <option value=${answer_option_3_1}>${answer_option_3_1}</option>
                    <option value=${answer_option_3_2}>${answer_option_3_2}</option>
                    <option value=${answer_option_3_3}>${answer_option_3_3}</option>
                    <option value=${answer_option_3_4}>${answer_option_3_4}</option>
                </select>
                .
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Weiter</button>
            </div>`;

            const answerContainerElem_Type_B = `<div class='babe-view-answer-container babe-response-dropdown'>
                <select id='response1' name='answer_1'>
                    <option disabled selected></option>
                    <option value=${answer_option_1_1}>${answer_option_1_1}</option>
                    <option value=${answer_option_1_2}>${answer_option_1_2}</option>
                </select>
                ${sentence_chunk_1}
                <select id='response2' name='answer_2'>
                    <option disabled selected></option>
                    <option value=${answer_option_2_1}>${answer_option_2_1}</option>
                    <option value=${answer_option_2_2}>${answer_option_2_2}</option>
                    <option value=${answer_option_2_3}>${answer_option_2_3}</option>
                </select>
                ${sentence_chunk_2}
                <select id='response3' name='answer_3'>
                    <option disabled selected></option>
                    <option value=${answer_option_3_1}>${answer_option_3_1}</option>
                    <option value=${answer_option_3_2}>${answer_option_3_2}</option>
                </select>
                der Box.
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Weiter</button>
            </div>`;

            const answerContainerElem_Type_C = `<div class='babe-view-answer-container babe-response-dropdown'>
                <select id='response1' name='answer_1'>
                    <option disabled selected></option>
                    <option value=${answer_option_1_1}>${answer_option_1_1}</option>
                    <option value=${answer_option_1_2}>${answer_option_1_2}</option>
                </select>
                ${sentence_chunk_1}
                <select id='response2' name='answer_2'>
                    <option disabled selected></option>
                    <option value=${answer_option_2_1}>${answer_option_2_1}</option>
                    <option value=${answer_option_2_2}>${answer_option_2_2}</option>
                    <option value=${answer_option_2_3}>${answer_option_2_3}</option>
                </select>
                ${sentence_chunk_2}
                <select id='response3' name='answer_3'>
                    <option disabled selected></option>
                    <option value=${answer_option_3_1}>${answer_option_3_1}</option>
                    <option value=${answer_option_3_2}>${answer_option_3_2}</option>
                </select>
                .
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Weiter</button>
            </div>`;

            const  answerContainerElem = config.data[CT].picture_type == 'A' ?
                  answerContainerElem_Type_A :
                  config.data[CT].picture_type == 'B' ?
                  answerContainerElem_Type_B : answerContainerElem_Type_C;

            $("#main").html(viewTemplate);

            const enableResponse = function() {
                let response1;
                let response2;
                let response3;

                $(".babe-view").append(answerContainerElem);

                response1 = $("#response1");
                response2 = $("#response2");
                response3 = $("#response3");

                // flags to check if dropdown menus have been used 
                var response_flags = [0, 0, 0];

                const display_button_checker = function() {
                    if (_.min(response_flags) == 1) {
                        $("#next").removeClass("babe-nodisplay");
                    }
                };

                response1.on("change", function() {
                    response_flags[0] = 1;
                    display_button_checker(0);
                });
                response2.on("change", function() {
                    response_flags[1] = 1;
                    display_button_checker(1);
                });
                response3.on("change", function() {
                    response_flags[2] = 1;
                    display_button_checker(2);
                });

                $("#next").on("click", function() {
                    const RT = Date.now() - startingTime; // measure RT before anything else
                    const trial_data = {
                        trial_type: config.trial_type,
                        trial_number: CT + 1,
                         sentence_frame: "..."
                            .concat(sentence_chunk_1)
                            .concat("...")
                            .concat(sentence_chunk_2)
                            .concat("..."),
                        response_1: $(response1).val(),
                        response_2: $(response2).val(),
                        response_3: $(response3).val(),
                        RT: RT
                    };

                    for (let prop in config.data[CT]) {
                        if (config.data[CT].hasOwnProperty(prop)) {
                            trial_data[prop] = config.data[CT][prop];
                        }
                    }

                    if (config.data[CT].picture !== undefined) {
                        trial_data.picture = config.data[CT].picture;
                    }

                    babe.trial_data.push(trial_data);
                    babe.findNextView();
                });
            };

            startingTime = Date.now();

            // creates the DOM of the trial view
            babeUtils.view.createTrialDOM(
                {
                    pause: config.pause,
                    fix_duration: config.fix_duration,
                    stim_duration: config.stim_duration,
                    data: config.data[CT],
                    evts: config.hook,
                    view: "multi_dropdown"
                },
                enableResponse
            );
        },
        CT: 0,
        trials: config.trials
    };

    return multi_dropdown_function;
};


const dropdown_8_options = function(config) {
    const dropdown_8_options_function = {
        name: config.name,
        title: babeUtils.view.setter.title(config.title, ""),
        render: function(CT, babe) {
            console.log(config.data[CT]);
            let startingTime;
            const QUD = babeUtils.view.setter.QUD(config.QUD);
            const question = babeUtils.view.setter.question(config.data[CT].question);
            const answer_option_1 = config.data[CT].choice_options[0];
            const answer_option_2 = config.data[CT].choice_options[1];
            const answer_option_3 = config.data[CT].choice_options[2];
            const answer_option_4 = config.data[CT].choice_options[3];
            const answer_option_5 = config.data[CT].choice_options[4];
            const answer_option_6 = config.data[CT].choice_options[5];
            const answer_option_7 = config.data[CT].choice_options[6];
            const answer_option_8 = config.data[CT].choice_options[7];
            const viewTemplate = `<div class='babe-view'>
                <h1 class='babe-view-title'>${this.title}</h1>
                <p class='babe-view-question babe-view-question'>${question}</p>
                <div class='babe-view-stimulus-container'>
                    <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;

            const answerContainerElem = `<div class='babe-view-answer-container babe-response-dropdown'>
                <select id='response' name='answer'>
                    <option disabled selected></option>
                    <option value=${answer_option_1}>${answer_option_1}</option>
                    <option value=${answer_option_2}>${answer_option_2}</option>
                    <option value=${answer_option_3}>${answer_option_3}</option>
                    <option value=${answer_option_4}>${answer_option_4}</option>
                    <option value=${answer_option_5}>${answer_option_5}</option>
                    <option value=${answer_option_6}>${answer_option_6}</option>
                    <option value=${answer_option_7}>${answer_option_7}</option>
                    <option value=${answer_option_8}>${answer_option_8}</option>
                </select>
                </p>
                <button id='next' class='babe-view-button babe-nodisplay'>Weiter</button>
            </div>`;

            $("#main").html(viewTemplate);

            const enableResponse = function() {
                let response;

                $(".babe-view").append(answerContainerElem);

                response = $("#response");

                // flags to check if dropdown menus have been used 
                var response_flags = [0];

                const display_button_checker = function() {
                    if (_.min(response_flags) == 1) {
                        $("#next").removeClass("babe-nodisplay");
                    }
                };

                response.on("change", function() {
                    response_flags[0] = 1;
                    display_button_checker(0);
                });

                $("#next").on("click", function() {
                    const RT = Date.now() - startingTime; // measure RT before anything else
                    const trial_data = {
                        trial_type: config.trial_type,
                        trial_number: CT + 1,
                        response: $(response).val(),
                        RT: RT
                    };

                    for (let prop in config.data[CT]) {
                        if (config.data[CT].hasOwnProperty(prop)) {
                            trial_data[prop] = config.data[CT][prop];
                        }
                    }

                    if (config.data[CT].picture !== undefined) {
                        trial_data.picture = config.data[CT].picture;
                    }

                    babe.trial_data.push(trial_data);
                    babe.findNextView();
                });
            };

            startingTime = Date.now();

            // creates the DOM of the trial view
            babeUtils.view.createTrialDOM(
                {
                    pause: config.pause,
                    fix_duration: config.fix_duration,
                    stim_duration: config.stim_duration,
                    data: config.data[CT],
                    evts: config.hook,
                    view: "dropdown_8_options"
                },
                enableResponse
            );
        },
        CT: 0,
        trials: config.trials
    };

    return dropdown_8_options_function;
};





