// initialises a babe experiment with babeInit
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    babeInit({
        views_seq: [
            intro,
            instructionsTask1,
            task_one,
            instructionsTask2,
            sentence_completion_1,
            pause,
            sentence_completion_2,
            pause,
            sentence_completion_3,
            pause,
            instructionsTask3,
            task_three, 
            pause,
            task_three,
            instructionsPostTest,
            post_test,
            thanks,
        ],
        deploy: {
            experimentID: "INSERT_A_NUMBER",
            serverAppURL: "https://babe-demo.herokuapp.com/api/submit_experiment/",
            deployMethod: "debug",
            contact_email: "YOUREMAIL@wherelifeisgreat.you",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                "task_one",
                "sentence_completion_1",
                "sentence_completion_2",
                "sentence_completion_3",
                "task_three"
            ],
            style: "separate",
            width: 100
        }
    });
});
