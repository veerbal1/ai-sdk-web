# Test Prompts for Chemistry Molecular Structure Visualization

## Direct Visualization Requests

### Simple Molecules
1. "Use RDKit to visualize ritonavir"
2. "Show me the molecular structure of ethanol"
3. "Can you draw the structure of caffeine?"
4. "Visualize the molecular diagram of aspirin"
5. "I want to see what benzene looks like"
6. "Display the structure of glucose"
7. "Show me the molecular structure of water"
8. "Can you generate a diagram of methane?"

### Organic Compounds
9. "Visualize the structure of ibuprofen"
10. "Show me what acetaminophen looks like at the molecular level"
11. "Draw the molecular structure of cholesterol"
12. "I need to see the structure of testosterone"
13. "Can you show me the molecular diagram of penicillin?"
14. "Visualize the structure of morphine"
15. "Display the molecular structure of codeine"

### Drug Molecules
16. "Show me the molecular structure of metformin"
17. "Visualize warfarin's molecular structure"
18. "Can you draw the structure of atorvastatin?"
19. "I want to see the molecular diagram of lisinopril"
20. "Show the structure of omeprazole"

## Comparison Requests

21. "Compare the molecular structures of ethanol and methanol"
22. "Show me both caffeine and theobromine side by side"
23. "Visualize aspirin and ibuprofen together for comparison"
24. "Display the structures of glucose and fructose next to each other"
25. "Compare the molecular structures of morphine and codeine"

## Educational Requests

26. "I'm studying organic chemistry. Can you show me the structure of benzene with its aromatic ring?"
27. "For my biochemistry class, I need to see the molecular structure of ATP"
28. "Help me understand the structure of DNA nucleotides by showing adenine"
29. "I'm learning about steroids. Show me the structure of cortisol"
30. "Can you visualize hemoglobin's heme group structure?"

## Functional Group Examples

31. "Show me a molecule with a hydroxyl group like ethanol"
32. "Visualize a carboxylic acid structure using acetic acid"
33. "Display an amine group using methylamine"
34. "Show me a ketone structure like acetone"
35. "Visualize an ester using ethyl acetate"

## Complex Molecules

36. "Generate the molecular structure of vitamin B12"
37. "Show me the complex structure of chlorophyll"
38. "Visualize the molecular diagram of insulin"
39. "Can you draw the structure of DNA base thymine?"
40. "Display the molecular structure of dopamine"

## Specific SMILES Requests

41. "Visualize this SMILES: CCO (ethanol)"
42. "Show me the structure for SMILES: CC(=O)O (acetic acid)"
43. "Draw the molecule from this SMILES: c1ccccc1 (benzene)"
44. "Visualize SMILES: CC(C)CC1=CC=C(C=C1)C(C)C(=O)O (ibuprofen)"
45. "Show the structure of SMILES: CN1C=NC2=C1C(=O)N(C(=O)N2C)C (caffeine)"

## Research & Analysis

46. "I'm researching Alzheimer's drugs. Show me the structure of donepezil"
47. "For my cancer research, visualize the structure of doxorubicin"
48. "Show me the molecular structure of the COVID drug remdesivir"
49. "Visualize the anti-malarial drug quinine"
50. "Display the structure of the diabetes drug metformin"

## Natural Products

51. "Show me the molecular structure of menthol"
52. "Visualize the structure of capsaicin (what makes peppers hot)"
53. "Draw the molecular structure of vanillin"
54. "Show me the structure of THC"
55. "Visualize the molecular diagram of nicotine"

## Polymer & Material Science

56. "Show me a repeating unit of polyethylene"
57. "Visualize the structure of nylon-6,6"
58. "Display the molecular structure of polyvinyl chloride (PVC)"

## Biochemistry

59. "Show me the structure of all four DNA bases together"
60. "Visualize the 20 standard amino acids"
61. "Display the molecular structures of different neurotransmitters"
62. "Show me the steroid hormone family structures"

## Advanced Requests

63. "Generate molecular diagrams for a series of alcohols: methanol, ethanol, propanol"
64. "Show me the homologous series of alkanes from methane to butane"
65. "Visualize different isomers of pentane"
66. "Compare stereoisomers of glucose (alpha and beta)"

## Tips for Testing

- These prompts should trigger the `moleculeStructureImage` tool
- The AI should automatically determine appropriate SMILES notation
- Multiple molecule requests should generate comparison images
- The AI should provide educational context along with visualizations
- Error handling should work for invalid or complex requests

## Expected Tool Parameters

For "Show me the molecular structure of caffeine":
```json
{
  "smiles": ["CN1C=NC2=C1C(=O)N(C(=O)N2C)C"],
  "legends": ["Caffeine"],
  "mols_per_row": 1,
  "sub_img_size": 300
}
```

For "Compare ethanol and methanol":
```json
{
  "smiles": ["CCO", "CO"],
  "legends": ["Ethanol", "Methanol"],
  "mols_per_row": 2,
  "sub_img_size": 300
}
``` 