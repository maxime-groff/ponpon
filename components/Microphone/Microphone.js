import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTheme } from "next-themes";

export default function Microphone() {

  // const commands = [
  //   {
  //     command: ["lance le programme :program", "début du programme :program"],
  //     callback: (program) => {
  //       setProgramme(program)
  //       router.push("/patient/program/overview");
  //     },
  //   },
  //   {
  //     command: ["(met en) pause (la vidéo) (l'exercice)", "stop la vidéo", "stop l'exercice"],
  //     callback: () => {
  //       pauseProgram()
  //     },
  //   },
  //   {
  //     command: ["reprend (la vidéo)", "continuer", "continu"],
  //     callback: () => {
  //       pauseProgram()
  //       resumeProgram()
  //     },
  //   },
  //   {
  //     command: ["arrêter (le programme)", "stop le programme", "je veux arrêter"],
  //     callback: () => {
  //       quitProgram()
  //     },
  //   }
  // ];

  const { theme, setTheme } = useTheme();
  const commands = [
    {
      command: "ouvre le site *",
      callback: (website) => {
        window.open("https://" + website.split(" ").join(""));
      },
    },
    {
      command: "change la couleur du fond pour du *",
      callback: (color) => {
        document.body.style.background = color;
        console.log("changement de la couleur ", color);
      },
    },
    {
      command: "lance le programme *",
      callback: (programme) => {
        console.log("programme sélectionné : ", programme);
        setProgramme(programme)
        setMessage("programme ", programme, " sélectionné")
        setMessage("en attente");
      },
    },
    {
      command: "début du programme *",
      callback: (programme) => {
        console.log("programme sélectionné : ", programme);
        setProgramme(programme)
        setMessage("programme ", programme, " sélectionné")
        setMessage("en attente");
      },
    },
    {
      command: "change * thème",
      callback: () => {
        setTheme(theme === "light" ? "dark" : "light");
      },
    },
    {
      command: "pause * vidéo",
      callback: () => {
        console.log("PAUSE");
        setMessage("en pause");
      },
    },
    {
      command: "lance * vidéo",
      callback: () => {
        console.log("PLAY");
        setMessage("en lecture");
      },
    },
    {
      command: "reprends * vidéo",
      callback: () => {
        console.log("REPRISE");
        setMessage("en lecture");
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("Aucun programme sélectionné");
  const [programme, setProgramme] = useState("Aucun programme sélectionné");
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="mb-8">
      <button
        type="button"
        className="text-sm bg-green-400 hover:bg-green-600 text-white py-2 px-3 rounded-xl mr-8"
        ref={microphoneRef}
        onClick={handleListing}
      >
        {isListening ? "Listening ..." : "Click to start Listening"}
      </button>
      {isListening && (
        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl "
          onClick={stopHandle}
        >
          Stop
        </button>
      )}
      <p className="mt-4 underline">Transcript : </p>
      {transcript && (
        <div>
          <div className="mb-8 mt-2">{transcript}</div>
          <button
            type="button"
            className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded-xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
      <p>
        <span className="underline">Programme choisi : </span>
        {programme && <span>{programme}</span>}
      </p>
      <p>
        <span className="underline">Statut de la vidéo : </span>
        {message && <span>{message}</span>}
      </p>
    </div>
  );
}
