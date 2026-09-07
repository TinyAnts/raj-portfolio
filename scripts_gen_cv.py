from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("Pop", "/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Pop-Bold", "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Pop-Med", "/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"))
pdfmetrics.registerFontFamily("Pop", normal="Pop", bold="Pop-Bold", italic="Pop", boldItalic="Pop-Bold")

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT

INK=HexColor("#221F1A"); FOREST=HexColor("#2E4A3B"); BRASS=HexColor("#A67C36"); MUT=HexColor("#6E6A61"); PAPER=HexColor("#F8F4EC")
W,H = A4
doc = BaseDocTemplate("public/Raj-S-CV.pdf", pagesize=A4,
    leftMargin=16*mm, rightMargin=16*mm, topMargin=14*mm, bottomMargin=14*mm,
    title="Raj S - CV", author="Nagarajan Shunmugam")

def bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER); canvas.rect(0,0,W,H,fill=1,stroke=0)
    canvas.setStrokeColor(BRASS); canvas.setLineWidth(2)
    L=8*mm; o=7*mm
    for (x,y,dx,dy) in [(o,H-o,1,-1),(W-o,H-o,-1,-1),(o,o,1,1),(W-o,o,-1,1)]:
        canvas.line(x,y,x+dx*L,y); canvas.line(x,y,x,y+dy*L)
    canvas.setFillColor(MUT); canvas.setFont("Courier",7)
    canvas.drawRightString(W-16*mm, 8*mm, f"Raj S - CV · raj.aivet.work · page {doc.page}")
    canvas.restoreState()

frame = Frame(16*mm, 14*mm, W-32*mm, H-28*mm, id="main")
doc.addPageTemplates([PageTemplate(id="pg", frames=[frame], onPage=bg)])

def P(text, **kw):
    st = ParagraphStyle("s", fontName=kw.get("font","Pop"), fontSize=kw.get("size",9),
        leading=kw.get("leading", kw.get("size",9)*1.38), textColor=kw.get("color",INK),
        spaceAfter=kw.get("after",0), spaceBefore=kw.get("before",0), alignment=kw.get("align",TA_LEFT))
    return Paragraph(text, st)

story=[]
story.append(P("RAJ S", font="Pop-Bold", size=23))
story.append(P("Nagarajan Shunmugam", size=10.5, color=MUT, before=2))
story.append(P("AI Engineer · CRISPR &amp; NGS Researcher · Co-Founder &amp; CTO · Future Veterinarian (DVM Candidate)", font="Pop-Med", size=9.6, color=FOREST, before=6))
story.append(P("Wrocław, Poland · ai.vet.ml@gmail.com · linkedin.com/in/nagaraj21 · raj.aivet.work", size=8.4, color=MUT, before=4, after=6))
story.append(HRFlowable(width="100%", thickness=1.2, color=FOREST, spaceAfter=8))

def section(title):
    story.append(Spacer(1,6))
    story.append(P(title.upper(), font="Pop-Bold", size=10, color=BRASS, after=2))
    story.append(HRFlowable(width="100%", thickness=0.6, color=HexColor("#D8D2C4"), spaceAfter=6))

def role(title, org, period, loc, desc=None):
    tbl = Table([[P(f"<b>{title}</b> · {org}", size=9.2), P(period, size=8.3, color=MUT, align=TA_RIGHT)]],
        colWidths=[(W-32*mm)*0.76,(W-32*mm)*0.24])
    tbl.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),1)]))
    story.append(tbl)
    if loc: story.append(P(loc, size=7.8, color=MUT))
    if desc: story.append(P(desc, size=8.5, color=HexColor("#44403A"), before=2))
    story.append(Spacer(1,6))

section("Profile")
story.append(P("Nine years of applied AI across six countries: autonomous trucks at Scania, medical imaging in Berlin, AI for the world's largest veterinary community, and CRISPR machine learning in Wrocław. Three-time startup co-founder. Currently a CRISPR &amp; NGS data researcher at the Hirszfeld Institute (Polish Academy of Sciences), CTO of MilkAI, and in the final year of veterinary school (graduating December 2026), building the bridge between AI and animal health.", size=8.8))

section("Experience")
role("CRISPR & NGS Data Researcher","Hirszfeld Institute of Immunology & Experimental Therapy, PAN","Nov 2025 – present","Wrocław, Poland",
     "ML pipelines for CRISPR off-target prediction on genomic, NGS and multi-omics data (k-mer, scalar, one-hot encodings; CNN and Transformer models). Multi-agent AI systems that design and validate wet-lab experiment protocols.")
role("Co-Founder & CTO","MilkAI LLC","Jul 2025 – present","California, USA",
     "Product studio shipping production-ready web, mobile and AI-first apps, with design-to-deploy CI/CD. Dozens of launches.")
role("Artificial Intelligence Engineer","Veterinary Information Network","May 2023 – Jul 2025","Remote (US company)",
     "AI engineering for the world's largest online veterinary community.")
role("Co-Founder","Zaide.ai","Jan 2023 – Aug 2024","Remote","Built private, custom large language models for healthcare and life sciences: secure local LLMs designed so sensitive clinical and research data never leaves the organization.")
role("Mentor & Alpha Tester","Coursera","Apr 2017 – Jun 2023","Orange County, CA",
     "Six years mentoring the Neural Networks & Deep Learning course; alpha-tested unreleased AI courses; mentored 3D-printing applications.")
role("Assistant Lecturer","Coventry University (Wrocław campus)","Aug 2022 – Mar 2023","Wrocław, Poland","Taught AI, IoT and software engineering.")
role("Senior AI Instructor","Techeta Technologies","Sep 2021 – Sep 2022","India","Trained technical and corporate teams in applied AI.")
role("Co-Founder & CTO","Neurons4vet.ai","Jan 2020 – Dec 2021","Toronto, Canada","First venture at the intersection of AI and veterinary medicine.")
role("Cohort Member","Entrepreneur First","Mar – Aug 2021","Berlin, Germany","Europe's leading deep-tech talent investor (300+ startups, over $2.7B portfolio).")
role("Thesis Student","Scania Group","Jan 2020 – Mar 2021","Stockholm, Sweden","Truck visual perception: classification, detection, semantic segmentation, depth estimation, reinforcement learning.")
role("Machine Learning Engineer","ai4medicine","May – Oct 2020","Berlin, Germany","Computer-vision AI for stroke and bleeding detection.")
role("Senior Design Engineer","KTH Formula Student","Aug 2019 – Jan 2020","Stockholm, Sweden","Autonomous race car perception; LiDAR point clouds; NVIDIA Jetson deployment.")
role("Project Assistant","Indian Institute of Technology, Delhi","Sep 2017 – Feb 2018","New Delhi, India","Driverless car: PID tuning, GPS+IMU+LiDAR+radar sensor fusion.")
role("Research Scholar","Indian Institute of Technology, Madras","Mar – Aug 2017","Chennai, India","Embedded programming, biomedical research lab (bio-medical kiosks, SpO2 sensors).")

section("Education")
edu = [
 ("Wrocław University of Environmental and Life Sciences (UPWR)","Veterinary Medicine, Veterinary Surgeon (DVM), final year, graduating December 2026","2021 – 2026"),
 ("Technische Universität Berlin","M.Sc. Autonomous Systems, Robotics & AI (full scholarship)","2018 – 2021"),
 ("KTH Royal Institute of Technology","M.Sc. Autonomous Systems, Robotics & AI (EIT Digital double degree)","2018 – 2021"),
 ("Aalto University","EIT Digital Summer School: Disrupting Retail","2019"),
 ("Anna University","B.E. Electrical & Electronics Engineering (partial scholarship)","2013 – 2017"),
]
for s2,d2,p2 in edu: role(s2,d2,p2,"")

section("Skills")
story.append(P("<b>AI/ML:</b> CNNs &amp; Transformers, deep reinforcement learning, imitation learning, multi-agent systems, data analysis · <b>Genomics:</b> CRISPR guide design, NGS &amp; multi-omics, k-mer/one-hot encodings · <b>Autonomy:</b> detection &amp; segmentation, depth estimation, LiDAR, sensor fusion, NVIDIA Jetson · <b>Engineering:</b> technical leadership, IoT &amp; embedded (Arduino), 3D printing, CI/CD", size=8.5))

section("Publication & Honors")
story.append(P("<b>Publication:</b> Deep Learning for Hardware-Constrained Cars: Imitation Learning &amp; Deep Reinforcement Learning", size=8.5))
story.append(P("<b>Honors:</b> Full scholarship (master's) · Partial scholarship (bachelor's) · <b>Languages:</b> Bilingual, English (IELTS C1) and Tamil", size=8.5, before=3))

doc.build(story)
print("CV regenerated")
