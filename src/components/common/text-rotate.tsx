"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  AnimatePresenceProps,
  motion,
  MotionProps,
  Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: (string | React.ReactNode)[];
  rotationInterval?: number;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean; // Whether to start from the first text when the last one is reached
  auto?: boolean; // Whether to start the animation automatically
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-100%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 1500,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Function to split text into characters (with support for unicode/emoji)
    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), ({ segment }) => segment);
      }
      return Array.from(text);
    };

    // Get the current text (can be a string or a React node)
    const currentText = texts[currentTextIndex] ?? "";

    // Navigation functions
    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset],
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    // If currentText is not a string (e.g. it contains lucide icons), render it directly.
    if (typeof currentText !== "string") {
      return (
        <motion.span
          className={cn(
            "relative flex items-center justify-center",
            mainClassName,
          )}
          {...props}
        >
          {/* Screen reader only (optionally, you could provide a fallback text) */}
          <span className="sr-only">Animated text</span>
          <div className="relative h-[200px] w-[400px] overflow-hidden">
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
            >
              <motion.div
                key={currentTextIndex}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                <motion.div
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={transition}
                >
                  {currentText}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.span>
      );
    }

    // If currentText is a string, perform splitting and animate each piece
    const elements = useMemo(() => {
      if (splitBy === "characters") {
        const words = (currentText as string).split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      // For words, lines or a custom split
      return (
        splitBy === "words"
          ? (currentText as string).split(" ")
          : splitBy === "lines"
            ? (currentText as string).split("\n")
            : (currentText as string).split(splitBy)
      ).map((text, i, array) => ({
        characters: [text],
        needsSpace: i !== array.length - 1,
      }));
    }, [currentText, splitBy]);

    // Helper to calculate stagger delay
    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (totalChars - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(totalChars / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * totalChars);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration],
    );

    return (
      <motion.span
        className={cn(
          "relative flex items-center justify-center",
          mainClassName,
        )}
        {...props}
      >
        {/* Screen reader only */}
        <span className="sr-only">{currentText}</span>
        <div className="relative h-[200px] w-[300px] overflow-hidden">
          <AnimatePresence
            mode={animatePresenceMode}
            initial={animatePresenceInitial}
          >
            <motion.div
              key={currentTextIndex}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                splitBy === "lines" ? "flex flex-col" : "flex flex-wrap",
              )}
              aria-hidden="true"
            >
              {(elements as WordObject[]).map((wordObj, wordIndex, array) => {
                const previousCharsCount = array
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0);
                return (
                  <span
                    key={wordIndex}
                    className={cn("inline-flex", splitLevelClassName)}
                  >
                    {wordObj.characters.map((char, charIndex) => (
                      <motion.span
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        key={charIndex}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(
                            previousCharsCount + charIndex,
                            array.reduce(
                              (sum, word) => sum + word.characters.length,
                              0,
                            ),
                          ),
                        }}
                        className={cn("inline-block", elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordObj.needsSpace && (
                      <span className="whitespace-pre"> </span>
                    )}
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.span>
    );
  },
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
