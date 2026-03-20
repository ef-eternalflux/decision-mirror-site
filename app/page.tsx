'use client';
import React from "react";

export default function DecisionMirrorJokeRound() {
  const [step, setStep] = React.useState<"home" | "q1" | "q2" | "q3" | "result">("home");
  const [answer1, setAnswer1] = React.useState<string | null>(null);
  const [factor, setFactor] = React.useState<string | null>(null);
  const [answer2, setAnswer2] = React.useState<string | null>(null);

  const baseOptions = [
    "It stops being funny",
    "It is funny, but still wrong",
    "If it is genuinely funny, that matters too",
    "It depends on the context",
  ];

  const factorOptions = [
    "If the person being joked about usually jokes the same way",
    "If this happened among close friends, not strangers",
    "If the person clearly felt hurt",
    "If the joke attacked arrogance, not weakness",
    "If it happened privately, not publicly",
    "Nothing would change my answer",
  ];

  const modifiedCase = () => {
    switch (factor) {
      case "If the person being joked about usually jokes the same way":
        return "Someone makes a genuinely funny joke that humiliates a person who usually jokes in exactly the same harsh way.";
      case "If this happened among close friends, not strangers":
        return "Someone makes a genuinely funny joke that humiliates a person, but this happens inside a very close friend group, not among strangers.";
      case "If the person clearly felt hurt":
        return "Someone makes a genuinely funny joke that humiliates a person, and it becomes obvious that the person is actually hurt by it.";
      case "If the joke attacked arrogance, not weakness":
        return "Someone makes a very sharp joke, but this time it targets an arrogant person who often humiliates others.";
      case "If it happened privately, not publicly":
        return "Someone makes a genuinely funny joke that humiliates a person, but it happens in private, not in front of a group.";
      case "Nothing would change my answer":
        return "Nothing changes. The situation stays the same. Do you still choose the same answer?";
      default:
        return "Someone in a group makes a genuinely funny joke, but the joke humiliates a person who cannot really defend themselves.";
    }
  };

  const resultText = () => {
    if (!answer1 || !factor || !answer2) return [];

    if (factor === "Nothing would change my answer" && answer1 === answer2) {
      return [
        "Your boundary in humor looks stable once humiliation enters the picture.",
        "For you, something does not become acceptable just because it lands well or gets a laugh.",
      ];
    }

    if (answer1 === answer2 && factor !== "Nothing would change my answer") {
      return [
        "You thought this factor might move you, but it did not.",
        "That suggests your line in humor is more fixed than your first explanation made it sound.",
      ];
    }

    if (factor === "If the person clearly felt hurt") {
      return [
        "You can tolerate edge more easily than real emotional injury.",
        "For you, a joke changes moral meaning fast once the pain stops being theoretical.",
      ];
    }

    if (factor === "If the joke attacked arrogance, not weakness") {
      return [
        "You do not react to harshness alone. You react to direction.",
        "For you, there is a moral difference between humiliating the weak and cutting down someone who abuses power.",
      ];
    }

    if (factor === "If this happened among close friends, not strangers") {
      return [
        "Your judgment softens when there is mutual familiarity and social safety.",
        "That suggests your boundary in humor depends partly on whether the people involved share the same ground rules.",
      ];
    }

    if (factor === "If it happened privately, not publicly") {
      return [
        "Public exposure matters to you more than the joke alone.",
        "You seem more disturbed by humiliation when it becomes social, visible, and hard to escape.",
      ];
    }

    if (factor === "If the person being joked about usually jokes the same way") {
      return [
        "Reciprocity changes your standard.",
        "For you, harsh humor feels less like cruelty when the target also lives by the same rules.",
      ];
    }

    return [
      "Your view of humor is not fixed by offense alone.",
      "It shifts with power, reciprocity, and whether the laugh feels like energy or humiliation.",
    ];
  };

  const reset = () => {
    setStep("home");
    setAnswer1(null);
    setFactor(null);
    setAnswer2(null);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-zinc-500">Mirror</div>
            <div className="mt-2 text-2xl font-semibold">A short reading of your humor boundary.</div>
          </div>
          <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">Prototype</div>
        </header>

        {step === "home" && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Round</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              One joke.
              <br />
              One hidden line.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              First you choose. Then you say what could change your answer. Then we test whether that really moves you.
            </p>
            <button
              onClick={() => setStep("q1")}
              className="mt-10 rounded-2xl bg-white px-6 py-4 text-base font-medium text-zinc-950 transition hover:scale-[1.01]"
            >
              Start
            </button>
          </div>
        )}

        {step === "q1" && (
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 text-zinc-400">
              Base case
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <h2 className="text-3xl font-semibold leading-tight">
                Someone in a group makes a genuinely funny joke, but the joke humiliates a person who cannot really defend themselves.
              </h2>
              <p className="mt-4 text-lg text-zinc-400">What feels closest to you?</p>
              <div className="mt-8 grid gap-3">
                {baseOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setAnswer1(option);
                      setStep("q2");
                    }}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-left text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "q2" && (
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-lg leading-8 text-zinc-200">
              You chose: <span className="text-white">{answer1}</span>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <h2 className="text-3xl font-semibold leading-tight">
                What could change your answer?
              </h2>
              <div className="mt-8 grid gap-3">
                {factorOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFactor(option);
                      setStep("q3");
                    }}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-left text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "q3" && (
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-lg leading-8 text-zinc-200">
              You said this could change your answer: <span className="text-white">{factor}</span>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <h2 className="text-3xl font-semibold leading-tight">{modifiedCase()}</h2>
              <p className="mt-4 text-lg text-zinc-400">What feels closest to you now?</p>
              <div className="mt-8 grid gap-3">
                {baseOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setAnswer2(option);
                      setStep("result");
                    }}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-left text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Reading</div>
              <div className="mt-6 grid gap-4">
                {resultText().map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-2xl leading-9 text-zinc-100"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Next round</div>
              <p className="mt-4 text-lg leading-8 text-zinc-300">
                If this felt accurate, leave your email. The next round will test a different fault line.
              </p>

              <form
                action="https://formsubmit.co/eternalfluxapp@gmail.com"
                method="POST"
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="_subject" value="New Mirror signup" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <input type="hidden" name="round" value="joke-boundary" />
                <input type="hidden" name="answer_1" value={answer1 ?? ""} />
                <input type="hidden" name="factor_that_could_change_it" value={factor ?? ""} />
                <input type="hidden" name="answer_2" value={answer2 ?? ""} />
                <input type="hidden" name="reading_summary" value={resultText().join(" ")} />

                <input
                  name="visitor_email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-white px-6 py-4 text-base font-medium text-zinc-950"
                >
                  Join the list
                </button>
              </form>

              <p className="mt-4 text-sm text-zinc-500">
                Replace eternalfluxapp@gmail.com with your real email in the form action.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={reset}
                  className="rounded-2xl border border-zinc-800 px-6 py-4 text-base text-zinc-300"
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}