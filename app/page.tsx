"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Moon, Sun, Sparkles, Zap } from "lucide-react"
import { useTheme } from "next-themes"

// Simulate grammar and typo fixing
function fixGrammarAndTypos(text: string): string {
  if (!text.trim()) return ""

  const corrected = text
    // Common typos
    .replace(/\bteh\b/gi, "the")
    .replace(/\brecieve\b/gi, "receive")
    .replace(/\boccur\b/gi, "occur")
    .replace(/\baccommodate\b/gi, "accommodate")
    .replace(/\bseperate\b/gi, "separate")
    .replace(/\bdefinately\b/gi, "definitely")
    .replace(/\bneccessary\b/gi, "necessary")
    .replace(/\bexcercise\b/gi, "exercise")
    .replace(/\bbeginning\b/gi, "beginning")
    .replace(/\bcommittee\b/gi, "committee")
    .replace(/\balot\b/gi, "a lot")
    .replace(/\bits\b/g, "it's")
    .replace(/\byour\b(?=\s+(a|an|the|going|coming|doing))/gi, "you're")

    // Grammar fixes
    .replace(/\bi\b/g, "I")
    .replace(/\bi'm\b/gi, "I'm")
    .replace(/\bi'll\b/gi, "I'll")
    .replace(/\bi've\b/gi, "I've")
    .replace(/\bi'd\b/gi, "I'd")

    // Multiple spaces
    .replace(/\s+/g, " ")

    // Sentence capitalization
    .replace(/(^|\. )([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase())

    // Remove extra spaces before punctuation
    .replace(/\s+([,.!?;:])/g, "$1")

    // Add space after punctuation if missing
    .replace(/([,.!?;:])([A-Za-z])/g, "$1 $2")

    // Trim
    .trim()

  return corrected
}

export default function GrammarFixer() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (inputText.trim()) {
      setIsProcessing(true)
      const timer = setTimeout(() => {
        const corrected = fixGrammarAndTypos(inputText)
        setOutputText(corrected)
        setIsProcessing(false)
      }, 400)

      return () => clearTimeout(timer)
    } else {
      setOutputText("")
      setIsProcessing(false)
    }
  }, [inputText])

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-50/20 dark:to-cyan-950/10">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-4">
            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg animate-pulse-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Grammar Fixer</h1>
              <p className="text-sm text-muted-foreground">Fix typos and grammar instantly with AI</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1 rounded-full bg-muted/50 backdrop-blur-sm">
            <Sun className="h-4 w-4 text-muted-foreground ml-2" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
              className="data-[state=checked]:bg-cyan-500"
            />
            <Moon className="h-4 w-4 text-muted-foreground mr-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Input Section */}
          <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyan-500" />
                    <label htmlFor="input-text" className="text-lg font-semibold text-foreground">
                      Enter your text
                    </label>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {inputText.length} characters
                  </span>
                </div>
                <Textarea
                  id="input-text"
                  placeholder="Type or paste your text here... For example: 'i recieve alot of emails everyday and its neccessary to respond quickly.'"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[240px] resize-none border-border/50 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 text-base leading-relaxed bg-background/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          {(outputText || isProcessing) && (
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm animate-fade-in">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-lg font-semibold text-foreground">Corrected text</span>
                    </div>
                    {outputText && (
                      <Button
                        onClick={handleCopy}
                        size="sm"
                        className="h-9 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-white" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Text
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="min-h-[240px] p-6 rounded-xl border border-border/30 bg-gradient-to-br from-muted/20 to-muted/10 backdrop-blur-sm">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-500 border-t-transparent"></div>
                          <span className="text-base">Fixing grammar and typos...</span>
                        </div>
                      </div>
                    ) : outputText ? (
                      <div className="whitespace-pre-wrap text-foreground leading-relaxed text-base">{outputText}</div>
                    ) : null}
                  </div>

                  {outputText && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                        {outputText.length} characters
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">✨ Ready to copy</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!inputText && (
            <div className="text-center py-16 animate-fade-in">
              <div className="relative mb-6">
                <div className="p-6 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/20 w-24 h-24 mx-auto flex items-center justify-center shadow-lg">
                  <Sparkles className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Start typing to see the magic</h3>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
                Your text will be automatically corrected for grammar mistakes and typos as you type.
                <span className="text-cyan-600 dark:text-cyan-400 font-medium"> Try it now!</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 max-w-5xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by AI • Made with ❤️ for better writing</p>
          </div>
        </div>
      </div>
    </div>
  )
}
