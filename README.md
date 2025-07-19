# DCB0129/DCB0160 Bow Tie Diagram Template

## ⚠️ DISCLAIMER

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.

## ⚠️ Disclaimer

This software is provided **"as is"** and used entirely at your own risk. 
It is your responsibility to consult your IT and cybersecurity specialists before use, to ensure the files meet your organisation’s security, data protection, and compliance requirements.

No responsibility or liability is accepted for any issues arising from this software, including interactions with other software present on your system.


## The Project

This is a demo project with a simple HTML-based bow tie diagram layout.

The diagrams allow rapid visual review of information that would otherwise be presented in lengthy spreadsheets and other forms of document.
Reviewers can 'post' comments to send to each other.
The diagrams make Hazard Log review meetings much easier and the group can collect the comments to allow the main documents to be updated in context.

## 🧷 What is a Bow Tie Diagram? (NHS DCB0129/DCB0160 Context)

In the context of NHS Clinical Risk Management, a **bow tie diagram** is a structured visual tool used to illustrate the lifecycle of a hazard, the associated threats (causes), the potential consequences, and the safety controls in place to manage risk.


It supports **DCB0129** (for manufacturers/suppliers) and **DCB0160** (for healthcare organisations) by helping Clinical Safety Officers (CSOs) communicate risk clearly and systematically.

The diagrams allow rapid visual review of a hazard log.

As it is visual, the easiest way to see the benefit is to look at the example in this repository.


### 🎯 Structure of the Bow Tie

- The **hazard** sits in the centre along with the **top event**
- On the **left side**, **threats** (things that could trigger the hazard) are shown with their **preventive controls**.
- On the **right side**, **consequences** (potential outcomes if the hazard occurs) are shown with their **mitigating or recovery controls**.

It is called a *bow tie* because the structure resembles a bow tie — with causes and consequences spreading out from the central event.

The diagram summarises the detail in each element in a short appropriate phrase.
More detail can be seen in the **i** (information) hover-over.

---

## ✅ Benefits of Using Bow Tie Diagrams for Clinical Risk Logs

| Benefit | Description |
|--------|-------------|
| **Visual Clarity** | Bow ties give an immediate overview of the risk landscape, helping stakeholders quickly understand the cause-control-effect chain. |
| **Communication** | Especially helpful for non-technical stakeholders (e.g. clinicians, managers, or auditors) who may struggle with raw tabular data. |
| **Engagement** | More likely to engage teams in risk discussions by visually emphasising control gaps. |
| **Integration with Clinical Safety Cases** | Supports presentation of high-risk issues in clinical safety case reports in a way that meets DCB0129/DCB0160 expectations for clarity and justification. |
| **Barrier Logic** | Emphasises the placement and effectiveness of barriers (controls) — useful when discussing risk acceptability with clinicians or boards. |

---

## ⚠️ Drawbacks Compared to Excel-Based Hazard Logs

| Drawback | Description |
|----------|-------------|
| **Lack of Scalability** | Harder to maintain large numbers of hazards; better suited to high-risk or representative hazards. |
| **Version Control** | Not as easily versioned or diff-tracked as structured Excel logs. |
| **Data Extraction & Traceability** | Excel logs allow easier filtering, exporting, or automated reporting. Bow ties are typically visual and not readily machine-readable unless specially structured. |
| **Duplication Risk** | In a hybrid system, you may end up recording hazards in both Excel and bow tie format, which can cause inconsistency. |
| **Not a Substitute** | DCB0129 and DCB0160 require a structured hazard log — bow ties are **supplementary**, not replacements for that log. |

---

## 🧭 Recommended Use

> **Bow tie diagrams should be used to complement the hazard log**, not replace it — particularly for **high-priority hazards** or when explaining risk to non-specialists.

In a Clinical Safety Case, bow ties can effectively support the narrative in the **Hazard Assessment** and **Risk Control** sections, especially when summarising residual risk and control strategies.


## 🛠️ Intended Use and Functionality

This bow tie diagram project is designed to support NHS Clinical Safety work under **DCB0129** and **DCB0160**, particularly for visualising and reviewing key hazards, threats, controls, and consequences from a Clinical Risk Management perspective.

You may use this tool in conjunction with hazard data from **Excel**, **CSV**, or a structured **database**, depending on how your clinical risk log is maintained.

---

### 📤 Generating Bow Tie Diagrams from Your Own Data

You can generate or modify diagrams by using:
- **Your own scripts/macros** to convert structured hazard log data into HTML that matches the template.
- The **provided sample HTML file** as a base layout for your diagram.

#### 🔧 If you're using Excel:
- Ensure that **preventive** and **recovery (mitigating)** controls are stored as **individual entries** rather than long free-text paragraphs.
- You could use some delimiters of your choice to identify different parts of the narrative in long free-text paragraphs.
- You may need to use Excel VBA or export your data as CSV and process it with a script (e.g. Python or JavaScript) to format the data correctly into HTML.

#### 🗃️ If you're using a database:
- You can write a script or export tool that extracts data from relevant **hazard**, **control**, and **consequence** tables.
- Output the data in a structure compatible with the diagram’s HTML format.

### Serial numbers
- In all cases use a unique serial number for each html extract.
- This ensures that you can only upload the comments back into the correct extract from the correct project.

---

### ✍️ Notes Functionality (JS-based)

This tool includes built-in **JavaScript functionality** to allow **interactive review notes** directly within the diagram.

#### ✨ Key Features:
- **Double-click any diagram element** (e.g. a top-event,threat, control, or consequence) to open a text field.
- Enter your **review notes or comments**.
- The element is automatically marked with a **dotted red outline** to indicate it has a note.

#### 💾 Saving Notes:
- Click **“Save Notes”** to download a `.json` file containing your comments.
- The file will be saved in your **Downloads folder** and includes a **unique serial number** tied to the diagram.

#### 📂 Loading Notes:
- Click **“Load Notes”** to re-apply a set of saved notes to the same diagram (e.g. for follow-up review or feedback from another CSO).
- Elements of the diagram that have notes that are loaded will be marked with a **red outline**
- Only notes from the **same diagram version** (matching serial number) can be loaded.

---

### ⚠️ Important: Note Preservation

> **CAUTION:** If you have entered or edited any notes:
> - **Do not close your browser** or **refresh the page**.
> - Doing so will **lose all unsaved changes**.
> - Always click **“Save Notes”** before exiting or navigating away.
> - If you are reviewing a digram sent to you that has notes - **load the notes first before editing them**
> - If you edit notes and then load a notes file this will **overwrite** your work.

This functionality is designed to **support peer review and collaboration**, especially between developers and Clinical Safety Officers (CSOs) during DCB0129/DCB0160 project assurance work.

---
