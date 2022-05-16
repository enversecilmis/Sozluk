import { readFileSync } from "fs"
import { searchWordInDisctionary } from "./utils"






// Create dictionary from txt
const file = readFileSync("sozluk.txt", {encoding: "utf-8"})
const lines = file.split("\r\n")
const dictionary = lines.map(line => line.split(/ {2,}/))




const hashFunc = (wordInput: string): number => {
    let code: number = 0
    for(let i=0; i<wordInput.length; i++)
        code += wordInput.charCodeAt(i)
    return code
}





// create hash table
const hashTable = Array(10000)
for (let i in dictionary){
    let hashIndex = hashFunc(dictionary[i][0]) % 10000

    while (hashTable[hashIndex] !== undefined){
        hashIndex++
        hashIndex = hashIndex % 10000
    }

    hashTable[hashIndex] = [dictionary[i][0],dictionary[i][1]]
}





const searchHashTable = (word: string): string => {
    let hashIndex = hashFunc(word) % 10000

    while(hashTable[hashIndex] !== undefined){
        
        if(hashTable[hashIndex][0] == word)
            return hashTable[hashIndex][1]
        
        hashIndex++
        hashIndex = hashIndex % 10000
    }

    return "*Sonuç Yok*"
}




const trans = searchHashTable("abouts")
console.log( trans );
