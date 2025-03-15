"use client"

import { Label } from "@/components/ui/label"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Russian noun declension data
const nounDeclensions = {
  masculine: {
    singular: {
      nominative: "-∅, -й, -ь",
      genitive: "-а, -я",
      dative: "-у, -ю",
      accusative: "-∅/а, -й/я, -ь/я",
      instrumental: "-ом, -ем, -ём",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-ы, -и",
      genitive: "-ов, -ев, -ёв, -ей, -∅",
      dative: "-ам, -ям",
      accusative: "-ы/ов, -и/ей",
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
  feminine: {
    singular: {
      nominative: "-а, -я, -ь",
      genitive: "-ы, -и",
      dative: "-е, -и",
      accusative: "-у, -ю, -ь",
      instrumental: "-ой, -ей, -ёй, -ью",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-ы, -и",
      genitive: "-∅, -ей",
      dative: "-ам, -ям",
      accusative: "-ы, -и, -ей",
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
  neuter: {
    singular: {
      nominative: "-о, -е",
      genitive: "-а, -я",
      dative: "-у, -ю",
      accusative: "-о, -е",
      instrumental: "-ом, -ем",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-а, -я",
      genitive: "-∅, -ев, -ей",
      dative: "-ам, -ям",
      accusative: "-а, -я",
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
}

// Example words for each gender
const examples = {
  masculine: {
    singular: {
      nominative: "стол, музей, словарь",
      genitive: "стола, музея",
      dative: "столу, музею",
      accusative: "стол/человека, музей/героя",
      instrumental: "столом, музеем",
      prepositional: "столе, музее",
    },
    plural: {
      nominative: "столы, музеи",
      genitive: "столов, музеев, словарей",
      dative: "столам, музеям",
      accusative: "столы, музеи",
      instrumental: "столами, музеями",
      prepositional: "столах, музеях",
    },
  },
  feminine: {
    singular: {
      nominative: "книга, неделя, дверь",
      genitive: "книги, недели, двери",
      dative: "книге, неделе, двери",
      accusative: "книгу, неделю, дверь",
      instrumental: "книгой, неделей, дверью",
      prepositional: "книге, неделе, двери",
    },
    plural: {
      nominative: "книги, недели, двери",
      genitive: "книг, недель, дверей",
      dative: "книгам, неделям, дверям",
      accusative: "книги, недели, двери",
      instrumental: "книгами, неделями, дверями",
      prepositional: "книгах, неделях, дверях",
    },
  },
  neuter: {
    singular: {
      nominative: "окно, море",
      genitive: "окна, моря",
      dative: "окну, морю",
      accusative: "окно, море",
      instrumental: "окном, морем",
      prepositional: "окне, море",
    },
    plural: {
      nominative: "окна, моря",
      genitive: "окон, морей",
      dative: "окнам, морям",
      accusative: "окна, моря",
      instrumental: "окнами, морями",
      prepositional: "окнах, морях",
    },
  },
}

export default function NounDeclensionTable() {
  const [selectedGender, setSelectedGender] = useState<"masculine" | "feminine" | "neuter">("masculine")
  const [showExamples, setShowExamples] = useState(true)
  const [hiddenEndings, setHiddenEndings] = useState<Record<string, boolean>>({})

  const toggleEndingVisibility = (caseType: string, number: "singular" | "plural") => {
    setHiddenEndings((prev) => ({
      ...prev,
      [`${caseType}_${number}`]: !prev[`${caseType}_${number}`],
    }))
  }

  const cases = ["nominative", "genitive", "dative", "accusative", "instrumental", "prepositional"]
  const caseTranslations = {
    nominative: "Именительный",
    genitive: "Родительный",
    dative: "Дательный",
    accusative: "Винительный",
    instrumental: "Творительный",
    prepositional: "Предложный",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedGender === "masculine" ? "default" : "outline"}
          onClick={() => setSelectedGender("masculine")}
        >
          Masculine
        </Button>
        <Button
          variant={selectedGender === "feminine" ? "default" : "outline"}
          onClick={() => setSelectedGender("feminine")}
        >
          Feminine
        </Button>
        <Button
          variant={selectedGender === "neuter" ? "default" : "outline"}
          onClick={() => setSelectedGender("neuter")}
        >
          Neuter
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch id="examples" checked={showExamples} onCheckedChange={setShowExamples} />
          <Label htmlFor="examples">Show Examples</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hide-endings"
            checked={Object.keys(hiddenEndings).length > 0}
            onCheckedChange={(checked) => {
              if (checked) {
                // Hide all endings
                const allHidden: Record<string, boolean> = {}
                cases.forEach((caseType) => {
                  allHidden[`${caseType}_singular`] = true
                  allHidden[`${caseType}_plural`] = true
                })
                setHiddenEndings(allHidden)
              } else {
                // Show all endings
                setHiddenEndings({})
              }
            }}
          />
          <Label htmlFor="hide-endings">Hide Endings (Test Mode)</Label>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Case</TableHead>
              <TableHead>Singular</TableHead>
              <TableHead>Plural</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseType) => (
              <TableRow key={caseType}>
                <TableCell className="font-medium">
                  {caseTranslations[caseType as keyof typeof caseTranslations]}
                  <div className="text-xs text-muted-foreground">{caseType}</div>
                </TableCell>
                <TableCell>
                  {hiddenEndings[`${caseType}_singular`] ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEndingVisibility(caseType, "singular")}
                      className="h-6 text-xs"
                    >
                      <Eye size={14} className="mr-1" /> Show
                    </Button>
                  ) : (
                    <>
                      <div className="font-medium">
                        {
                          nounDeclensions[selectedGender].singular[
                            caseType as keyof typeof nounDeclensions.masculine.singular
                          ]
                        }
                      </div>
                      {showExamples && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {examples[selectedGender].singular[caseType as keyof typeof examples.masculine.singular]}
                        </div>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {hiddenEndings[`${caseType}_plural`] ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEndingVisibility(caseType, "plural")}
                      className="h-6 text-xs"
                    >
                      <Eye size={14} className="mr-1" /> Show
                    </Button>
                  ) : (
                    <>
                      <div className="font-medium">
                        {
                          nounDeclensions[selectedGender].plural[
                            caseType as keyof typeof nounDeclensions.masculine.plural
                          ]
                        }
                      </div>
                      {showExamples && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {examples[selectedGender].plural[caseType as keyof typeof examples.masculine.plural]}
                        </div>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {Object.keys(hiddenEndings).length > 0 && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => setHiddenEndings({})}>
            <Eye className="mr-2 h-4 w-4" /> Reveal All Endings
          </Button>
        </div>
      )}
    </div>
  )
}

