// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://babe-project.github.io/babe-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = babeViews.view_generator("intro",{
    trials: 1,
    name: 'intro',
    title: 'Herzlich Willkommen',
    // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
    text: 'Vielen Dank, dass du an unserem Experiment teilnimmst. Im Folgenden werden wir dir kurz erklären, wie das Experiment abläuft. Bitte klicke dazu auf den Start Button.',
   buttonText: 'Start'    
});

// For most tasks, you need instructions views
const instructionsTask1 = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instrucions_task_one',
    title: 'Anleitung - Teil I',
    text:  'Im ersten Teil des Experiments sollst du die Farbe der Form angeben, die du auf dem Bildschirm siehst.',
    buttonText: 'Weiter'
});

const instructionsTask2 = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instructions_task_two',
    title: 'Anleitung - Teil II',
    text:  'In diesem Teil des Experiments sollst du die Bilder, die du auf dem Bildschirm siehst, beschreiben, indem du Lücken in unvollständigen Sätzen ausfüllst.',
    buttonText: 'Weiter'
});

const instructionsTask3 = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instructions_task_three',
    title: 'Anleitung - Teil III',
    text:  'Im letzten Teil des Experiments sollst du dir nun Beschreibungen der Bilder, die du vorher gesehen hast, durchlesen, und beurteilen wie gut diese Beschreibungen sind. In jedem Durchgang wird dir gesagt, auf welchen Aspekt des Bildes du achten sollst, entweder die Größe, die Farbe, oder die Position der Formen. Du kannst die Beschreibung von 1, überhaupt nicht zutreffend, bis 7, vollkommen zutreffend, bewerten.',
    buttonText: 'Weiter'
});

const instructionsPostTest = babeViews.view_generator("instructions",{
    trials: 1,
    name: 'instructions_post_test',
    title: 'Post Questionnaire',
    text: `Next you will see a sample <a href='/'>Post Test view</a>. 
    The default questions and answer options are in English, however, the whole questionnaire can be translated. In the following Post Test
    sample the questions are in German.`
});

// In the post test questionnaire you can ask your participants addtional questions
const post_test = babeViews.view_generator("post_test",{
    trials: 1,
    name: 'post_test',
    title: 'Additional information',
    text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

    // You can change much of what appears here, e.g., to present it in a different language, as follows:
    // buttonText: 'Weiter',
    // age_question: 'Alter',
    // gender_question: 'Geschlecht',
    // gender_male: 'männlich',
    // gender_female: 'weiblich',
    // gender_other: 'divers',
    // edu_question: 'Höchster Bildungsabschluss',
    // edu_graduated_high_school: 'Abitur',
    // edu_graduated_college: 'Hochschulabschluss',
    // edu_higher_degree: 'Universitärer Abschluss',
    // languages_question: 'Muttersprache',
    // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = babeViews.view_generator("thanks", {
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _babe (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://babe-project.github.io/babe-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://babe-project.github.io/babe-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://babe-project.github.io/babe-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
/*const forced_choice_2A = babeViews.view_generator("forced_choice", {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.forced_choice.length,
    // name should be identical to the variable name
    name: 'forced_choice_2A',
    data: trial_info.forced_choice,
    // you can add custom functions at different stages through a view's life cycle
    // hook: {
    //     after_response_enabled: check_response
    // }
});*/

const task_one = dropdown_8_options ({
    trials: 1,
    name: 'task_one',
    trial_type: 'dropdown_8_options',
    data: part_one_trial_info.dropdown_8_options
});

const task_three = babeViews.view_generator("self_paced_reading_rating_scale", {
    trials: 2,
    name: 'task_three',
    trial_type: 'rating_scale',
    data: part_three_trial_info.rating_scale
});

const pause = babeViews.view_generator("instructions", {
    trials: 1,
    name: 'pause',
    title: 'Pause',
    text: 'Klicke auf den Button um das Experiment fortzusetzen.',
    buttonText: 'Weiter'
});

const sentence_completion_1 = multiple_dropdown ({
    trials: 2,
    name: 'sentence_completion',
    trial_type: 'dropdown_sentence_completion',
    data: _.shuffle(_.filter(part_two_trial_info.multi_dropdown,
                             function(t) {return t.listNumber == sentence_completion_lists[0];}))
});

const sentence_completion_2 = multiple_dropdown ({
    trials: 2,
    name: 'sentence_completion',
    trial_type: 'dropdown_sentence_completion',
    data: _.shuffle(_.filter(part_two_trial_info.multi_dropdown,
                             function(t) {return t.listNumber == sentence_completion_lists[1];}))
});

const sentence_completion_3 = multiple_dropdown ({
    trials: 2,
    name: 'sentence_completion',
    trial_type: 'dropdown_sentence_completion',
    data: _.shuffle(_.filter(part_two_trial_info.multi_dropdown,
                             function(t) {return t.listNumber == sentence_completion_lists[2];}))
});


// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
