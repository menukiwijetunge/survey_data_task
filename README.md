# Culture Amp Technical Interview Exercise

In this exercise, we look forward to working with you and learning about how you approach hands-on technical work.

We're sharing this exercise in advance so you can familiarise yourself with it and make a start on it. Please spend up to one hour working on your solution. It's okay if you don't complete the task within that time; there will be enough time in the interview for us to work through everything together. During the interview, you will also receive some additional requirements.

You are welcome to use AI coding assistants to help you. If you choose to use one, please be prepared to share the prompts you used and explain your process for using AI to tackle the assignment.

## What we’ll be building

Your task is to write a function to parse and analyze survey data and display some results. The function should accept only one argument: the survey data.

The function should parse the data and present the results of a specific analysis:

- Average results: the average result for each question

Any response with a submission time is considered to have participated in the survey. Results from non-submitted surveys should not be considered in the analysis.

*During the interview, you will receive some additional requirements.*

*Depending on how we spend our time, we may not have time to implement these requirements in full, and that's okay. At a minimum, we want we get a feel for how the application would grow to add the remaining capabilities.*

### Survey data

| Employee ID | Submission time | I like the kind of work I do. | In general, I have the resources I need to be effective. | We are working at the right pace to meet our goals. | I feel empowered to get the work done for which I am responsible. | I am appropriately involved in decisions that affect my work. |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|1|2021-07-28T20:35:41+00:00|5||5|4|4|
|2|2021-07-29T07:05:41+00:00|4|5|5|3|3|
|3|2021-07-29T17:35:41+00:00|5|5||5|4|
|4|||||||
|5|2021-07-30T04:05:41+00:00|4|5|5||4|
|6||5|5|5|2|3|

Each row in the above table represents a response to the survey.

The headers in the table are:

- Employee ID
- Submission time *(if there is no timestamp, you can assume this person did not submit a survey)*
- A column for the answer to each of the 5 survey questions. The headers contain the question text.

The answers to questions are always an integer between (and including) 1 and 5. Blank values represent not answered questions.

Note You'll need to decide on a suitable data structure to organise the survey data.

## Getting started

- **Choose a Language:** Decide whether to solve the exercise using JavaScript or TypeScript. Pick the programming language that you’re more familiar with and that will show you at your best. We want you to focus on demonstrating the fundamentals of your chosen language rather than relying on frameworks or libraries.
- **Set up Your Environment:** Set up your development environment in a way that you are comfortable with. If you rely on a code formatter to keep your code tidy, feel free to set this up.
- **AI Assistants:** You are allowed to use AI coding assistants before and during the interview. If you use one, please be prepared to share the prompts you used and explain your approach to using AI for the assignment.
- **Spend up to one hour** working on the assignment before the interview.

## How we’ll spend our time together

This part of your interview will consist of the following:

**1. Discussion of Your Solution (~10 minutes):**

We'll start by discussing the solution you prepared. We want to hear about your overall approach, whether you used an AI assistant, and if so, what prompts you used, what worked and what didn't, what you found hard, and what was straightforward.

**2. Coding (~35 minutes):**

We'll present the new requirement and confirm your understanding. Then, we'll ask you to take the lead in implementing it. We encourage you to talk us through your thought process as you work, treating us as your collaborators. It is very unlikely we will have time to finish.

Please don't rush to cover all the requirements within the interview time. You'd likely have to cut corners, you normally wouldn't, to do this. We want to see a true reflection of how you normally work, not a race to the finish line. We encourage you to spend this time working on the most interesting parts of the solution.

As in any collaborative coding situation, please talk us through your thought process as you work. If you'd normally ask a collaborator an opinion, or if they remember how to do something, ask us! If you'd normally look things up online, use the same resources you normally would.

**3. Wrap-up (~5 minutes):**

We'll be tempted to use every remaining minute of the interview to write code, but we'll make a point to stop before the end to take stock. We'll discuss what you've accomplished and how you would continue to develop the solution. We'll also talk about any key learnings you had during the process.

- Did you solve the problem we set out to solve? 
- Did it turn out as you expected it to? 
- Are you especially happy or unhappy with any aspect of your work in progress?

## What we’re looking for

While we work with you, we’ll be interested in learning about the following traits, which we believe are important for engineers at Culture Amp:

- Collaboration
- Technical communication
- Problem-solving
- Attention to detail
- Proficiency with chosen programming language

But again, please don't feel pressure to demonstrate a level of mastery or experience that you do not have. Remember: "Have the courage to be vulnerable". Say when you need help or don’t know. You might know why something like test-driven development is desirable, and how you'd go about attempting this if given the opportunity, even if you don't have the hands-on experience to demonstrate this to us in this exercise.

We recognise that many technical skills are easy to pick up on the job. We're seeking to understand your *potential*. Talk us through where you're at, then show us how you currently work.

We look forward to working on this with you!
