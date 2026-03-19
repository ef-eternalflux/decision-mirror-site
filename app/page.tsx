'use client'
import React from "react"
export default function DecisionMirrorExperience() {
  const scenes = [
    {
      id: 1,
      mode: "binary",
      lead: "Let’s not do a personality test.",
      title: "Your close friend lied at work to keep their job and support their family.",
      prompt: "What bothers you more here?",
      choices: [
        "The lie itself",
        "The idea of judging them too fast",
      ],
      readA: "So truth hits you first.",
      readB: "So context softens your first reaction.",
    },
    {
      id: 2,
      mode: "scale",
      lead: "Good. Let’s make that less comfortable.",
      title: "If telling the truth would deeply hurt someone you love, how far would you go to protect them from it?",
      prompt: "Choose where you land.",
      choices: [
        "Truth no matter what",
        "Mostly truth",
        "It depends",
        "I would protect them",
      ],
      readA: "You like a clean line.",
      readB: "You still want the line, but not at any human cost.",
      readC: "You distrust absolutes once pain becomes personal.",
      readD: "Protection matters more to you than pure honesty in some real situations.",
    },
    {
      id: 3,
      mode: "binary",
      lead: "Now humor. This is where people reveal more than they think.",
      title: "A joke is genuinely funny, but it humiliates someone weaker.",
      prompt: "What matters more to you?",
      choices: [
        "That it crosses a line",
        "That context decides whether it works",
      ],
      readA: "So cruelty ruins the laugh faster than awkwardness does.",
      readB: "So you do not judge humor in the abstract. You judge who absorbs the cost.",
    },
    {
      id: 4,
      mode: "binary",
      lead: "Let’s move from values to pressure.",
      title: "Someone publicly humiliates you.",
      prompt: "What feels more true to you?",
      choices: [
        "I want to answer immediately",
        "I want control more than reaction",
      ],
      readA: "So dignity in you has heat.",
      readB: "So dignity in you prefers containment over explosion.",
    },
  ];

  const [step, setStep] = React.useState<"home" | "scene" | "result">("home");
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [history, setHistory] = React.useState<string[]>([]);
  const [questionStartedAt, setQuestionStartedAt] = React.useState<number>(0);
  const [responseTimes, setResponseTimes] = React.useState<Record<number, number>>({});
  const [email, setEmail] = React.useState("");
  const [emailSubmitted, setEmailSubmitted] = React.useState(false);

  const current = scenes[index];

  const begin = () => {
    setStep("scene");
    setQuestionStartedAt(Date.now());
  };

  const choose = (choiceIndex: number) => {
    const elapsed = Date.now() - questionStartedAt;
    setResponseTimes((prev) => ({ ...prev, [current.id]: elapsed }));
    setAnswers((prev) => ({ ...prev, [current.id]: choiceIndex }));

    const readKey = ["readA", "readB", "readC", "readD"][choiceIndex] as keyof typeof current;
    const reading = current[readKey];
    if (reading && typeof reading === "string") {
      setHistory((prev) => [...prev, reading]);
    }

    if (index < scenes.length - 1) {
      setTimeout(() => {
        setIndex((v) => v + 1);
        setQuestionStartedAt(Date.now());
      }, 550);
    } else {
      setTimeout(() => setStep("result"), 650);
    }
  };

  const averageResponseTime = Object.keys(responseTimes).length
    ? Object.values(responseTimes).reduce((sum, value) => sum + value, 0) / Object.values(responseTimes).length
    : 0;

  const hesitation = Object.entries(responseTimes)
    .filter(([, value]) => averageResponseTime > 0 && value > averageResponseTime * 1.7)
    .map(([k]) => Number(k));

  const profile = () => {
    const a1 = answers[1];
    const a2 = answers[2];
    const a3 = answers[3];
    const a4 = answers[4];

    const blocks: string[] = [];

    if (a1 === 0 && (a2 === 2 || a2 === 3)) {
      blocks.push(
        "You want honesty to matter, but once pain becomes personal, your standards soften. You are less rigid than your first reaction suggests."
      );
    } else if (a1 === 1 && (a2 === 2 || a2 === 3)) {
      blocks.push(
        "You do not trust moral judgments made too quickly. In your answers, context and human cost come in early and stay there."
      );
    } else if (a1 === 0 && (a2 === 0 || a2 === 1)) {
      blocks.push(
        "You seem to need a line you can defend even when the emotional price rises. That does not make you cold. It means self-respect and consistency are tightly linked for you."
      );
    } else {
      blocks.push(
        "Your judgment does not look mechanical. You keep adjusting for motive, closeness, and consequence instead of protecting one clean rule at all costs."
      );
    }

    if (a3 === 0) {
      blocks.push(
        "In humor, the line appears where weakness becomes the whole punchline. You can tolerate awkwardness more easily than humiliation."
      );
    } else {
      blocks.push(
        "You do not judge humor in isolation. For you, a joke changes meaning depending on who pays the emotional price for it."
      );
    }

    if (a4 === 0) {
      blocks.push(
        "When dignity is hit, your instinct has heat. You may not always act on it, but humiliation clearly changes the force of your judgment."
      );
    } else {
      blocks.push(
        "Under pressure, you seem to value control over immediate discharge. You do not look passive. You look contained."
      );
    }

    if (hesitation.length > 0) {
      const map: Record<number, string> = {
        1: "truth versus judgment",
        2: "truth versus protection",
        3: "humor versus harm",
        4: "humiliation versus control",
      };
      blocks.push(
        `You slowed down most around ${hesitation.map((x) => map[x]).join(" and ")}. That usually marks tension, not weakness. It means those answers cost you more to settle.`
      );
    }

    blocks.push(
      "The strongest signal here is not your morality in the abstract. It is that your decisions change when a person stops being theoretical and starts becoming emotionally real to you."
    );

    return blocks;
  };

  const reset = () => {
    setStep("home");
    setIndex(0);
    setAnswers({});
    setHistory([]);
    setQuestionStartedAt(0);
    setResponseTimes({});
    setEmail("");
    setEmailSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Decision Mirror</div>
            <div className="mt-2 text-2xl font-semibold">An AI reading of how you actually decide.</div>
          </div>
          <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">Prototype</div>
        </header>

        {step === "home" && (
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
              <h1 className="text-4xl font-semibold leading-tight">
                This should not feel like a quiz.
                <br />
                It should feel like being read.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                A short AI reading through a few uncomfortable choices. No labels. No fake psychology. Just
                pressure, pushback, and a sharper sense of how you actually decide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-400">
                <span className="rounded-full border border-zinc-800 px-4 py-2">4 scenes</span>
                <span className="rounded-full border border-zinc-800 px-4 py-2">AI reactions in between</span>
                <span className="rounded-full border border-zinc-800 px-4 py-2">1 uncomfortable reading</span>
              </div>
              <button
                onClick={begin}
                className="mt-10 rounded-2xl bg-white px-6 py-4 text-base font-medium text-zinc-950 transition hover:scale-[1.01]"
              >
                Start the reading
              </button>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6">
              <div className="text-sm text-zinc-500">How it feels</div>
              <div className="mt-4 space-y-4 text-zinc-300">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                  One difficult choice at a time.
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                  The AI reacts to your answer instead of waiting until the end.
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                  The result should feel specific enough to sting a little.
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "scene" && current && (
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 text-zinc-400">
              {current.lead}
            </div>

            {history.length > 0 && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-lg leading-8 text-zinc-200">
                {history[history.length - 1]}
              </div>
            )}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Scene {index + 1}</div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight">{current.title}</h2>
              <p className="mt-4 text-lg text-zinc-400">{current.prompt}</p>

              <div className="mt-8 grid gap-3">
                {current.choices.map((choice, i) => (
                  <button
                    key={choice}
                    onClick={() => choose(i)}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-left text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">What the AI sees</div>
              <h2 className="mt-4 text-3xl font-semibold">This is closer to a reading than a result.</h2>

              <div className="mt-8 grid gap-4">
                {profile().map((item, i) => (
                  <div
                    key={`${i}-${item}`}
                    className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-lg leading-8 text-zinc-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Get the next round</div>
              <p className="mt-4 text-lg leading-8 text-zinc-300">
                If this felt more accurate than comfortable, leave your email. The next round will go deeper
                and push back harder.
              </p>

              {!emailSubmitted ? (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                  <button
                    onClick={() => email.trim() && setEmailSubmitted(true)}
                    className="rounded-2xl bg-white px-6 py-4 text-base font-medium text-zinc-950"
                  >
                    Join the list
                  </button>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-emerald-900 bg-emerald-950/40 p-4 text-emerald-300">
                  You are in. We will send the next round when it is ready.
                </div>
              )}

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
