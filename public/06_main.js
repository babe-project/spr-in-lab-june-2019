// In this file you initialize and configure your experiment using babeInit

$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    // in debug mode this returns the babe-object, which you can access in the console of your browser
    // e.g. >> window.babe_monitor or window.babe_monitor.findNextView()
    // in all other modes null will be returned
    window.babe_monitor = babeInit({
        // You have to specify all views you want to use in this experiment and the order of them
        views_seq: [
           intro,
            instructionsTask1,
            task_one,
            instructionsTask2_1,
            practice_task_two,
            instructionsTask2_2,
            task_two_1,
            pause_1,
            task_two_2,
            pause_2,
            task_two_3,
            pause_3,
            instructionsTask3_1,
            practice_task_three,
            instructionsTask3_2,
            task_three_1,
            pause_4,
            task_three_2,
            pause_5,
            task_three_3,
            pause_6,
            task_three_4,
            instructionsPostTest,
            post_test,
            thanks,
        ],
        // Here, you can specify all information for the deployment
        deploy: {
            experimentID: "INSERT_A_NUMBER",
            serverAppURL: "https://babe-demo.herokuapp.com/api/submit_experiment/",
            // Possible deployment methods are:
            // "debug" and "directLink"
            // As well as "MTurk", "MTurkSandbox" and "Prolific"
            deployMethod: "debug",
            contact_email: "vini.macuch@gmail.com",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        // Here, you can specify how the progress bar should look like
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                "task_one_1",
                "task_two_1",
                "task_two_2",
                "task_two_3",
                "task_three_1",
                "task_three_2",
                "task_three_3",
                "task_three_4"
            ],
             // Possible styles are "default", "separate" and "chunks"
            style: "default",
            width: 100
        }
    });
});
