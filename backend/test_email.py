#!/usr/bin/env python3
# contact_form.py - Formulaire de contact avec envoi email
# Les informations sont envoyées à TON email (achillemolo403@gmail.com)

import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import getpass

# ============================================
# CONFIGURATION - TON EMAIL (celui qui reçoit)
# ============================================
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'achillemolo403@gmail.com'  # TON email (expéditeur)
EMAIL_HOST_PASSWORD = 'emluveftlyosoxrv'       # Ton mot de passe d'application
DEFAULT_FROM_EMAIL = f'ReaxAcademy <{EMAIL_HOST_USER}>'
EMAIL_DESTINATAIRE = 'achillemolo403@gmail.com'  # TON email (destinataire)

# ============================================
# FONCTION DE SAISIE
# ============================================

def saisir_informations():
    """Fonction pour saisir les informations de l'utilisateur"""
    
    print("\n" + "="*60)
    print("📝 FORMULAIRE DE CONTACT - REAXACADEMY")
    print("="*60)
    print("Veuillez remplir tous les champs obligatoires (*)")
    print("="*60)
    
    # Saisie du nom
    print("\n👤 * NOM COMPLET")
    nom = input("   Nom et prénom: ").strip()
    while not nom:
        print("   ❌ Le nom est obligatoire!")
        nom = input("   Nom et prénom: ").strip()
    
    # Saisie de l'email de l'utilisateur
    print("\n📧 * EMAIL DE L'UTILISATEUR")
    print("   (Pour que nous puissions vous répondre)")
    email_utilisateur = input("   Email: ").strip()
    while not email_utilisateur or '@' not in email_utilisateur or '.' not in email_utilisateur:
        print("   ❌ Email valide obligatoire!")
        email_utilisateur = input("   Email: ").strip()
    
    # Saisie du téléphone
    print("\n📱 TÉLÉPHONE (optionnel)")
    telephone = input("   Téléphone: ").strip()
    
    # Saisie du sujet
    print("\n📋 * SUJET")
    sujet = input("   Sujet de votre message: ").strip()
    while not sujet:
        print("   ❌ Le sujet est obligatoire!")
        sujet = input("   Sujet de votre message: ").strip()
    
    # Saisie du message
    print("\n💬 * MESSAGE")
    print("   (Tapez votre message, appuyez sur Entrée pour une nouvelle ligne)")
    print("   (Pour terminer, tapez 'FIN' sur une ligne vide)")
    
    lignes = []
    while True:
        ligne = input()
        if ligne == "FIN":
            break
        lignes.append(ligne)
    
    message = "\n".join(lignes)
    while not message:
        print("   ❌ Le message est obligatoire!")
        print("   Tapez votre message (FIN pour terminer):")
        lignes = []
        while True:
            ligne = input()
            if ligne == "FIN":
                break
            lignes.append(ligne)
        message = "\n".join(lignes)
    
    # Création du dictionnaire avec TOUTES les informations
    data = {
        "nom": nom,
        "email_utilisateur": email_utilisateur,  # Email de la personne qui contacte
        "telephone": telephone if telephone else "Non fourni",
        "sujet": sujet,
        "message": message,
        "date_envoi": datetime.now().strftime("%d/%m/%Y à %H:%M:%S")
    }
    
    return data

# ============================================
# FONCTION D'ENVOI D'EMAIL
# ============================================

def envoyer_email(data):
    """Envoie un email avec TOUTES les informations de l'utilisateur"""
    
    # Construction d'un email HTML professionnel
    html = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background: #f9f9f9;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 28px;
                }}
                .header p {{
                    margin: 10px 0 0;
                    opacity: 0.9;
                }}
                .content {{
                    padding: 30px;
                    background: white;
                }}
                .info-section {{
                    background: #f8f9fa;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-left: 4px solid #667eea;
                }}
                .info-section h3 {{
                    margin-top: 0;
                    color: #667eea;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 10px;
                }}
                .info-item {{
                    margin: 15px 0;
                    display: flex;
                    align-items: flex-start;
                }}
                .info-label {{
                    font-weight: bold;
                    min-width: 120px;
                    color: #555;
                }}
                .info-value {{
                    color: #333;
                    background: white;
                    padding: 8px 15px;
                    border-radius: 5px;
                    flex: 1;
                }}
                .message-box {{
                    background: #f0f7ff;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                    border: 1px solid #cce5ff;
                }}
                .message-box h3 {{
                    color: #0056b3;
                    margin-top: 0;
                }}
                .message-content {{
                    white-space: pre-wrap;
                    font-style: italic;
                    line-height: 1.8;
                }}
                .footer {{
                    background: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    border-top: 1px solid #e0e0e0;
                }}
                .badge {{
                    display: inline-block;
                    background: #28a745;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    margin-top: 10px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📬 Nouveau message de contact</h1>
                    <p>ReaxAcademy - Formulaire de contact</p>
                </div>
                
                <div class="content">
                    <div class="info-section">
                        <h3>👤 INFORMATIONS DE L'EXPÉDITEUR</h3>
                        
                        <div class="info-item">
                            <span class="info-label">Nom complet:</span>
                            <span class="info-value"><strong>{data['nom']}</strong></span>
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span class="info-value">
                                <a href="mailto:{data['email_utilisateur']}" style="color: #667eea;">
                                    {data['email_utilisateur']}
                                </a>
                            </span>
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Téléphone:</span>
                            <span class="info-value">{data['telephone']}</span>
                        </div>
                        
                        <div class="info-item">
                            <span class="info-label">Sujet:</span>
                            <span class="info-value"><strong>{data['sujet']}</strong></span>
                        </div>
                    </div>
                    
                    <div class="message-box">
                        <h3>💬 MESSAGE</h3>
                        <div class="message-content">
                            {data['message'].replace(chr(10), '<br>')}
                        </div>
                    </div>
                    
                    <div style="text-align: right; color: #666; font-size: 12px;">
                        📅 Reçu le: {data['date_envoi']}
                    </div>
                    
                    <div style="text-align: center;">
                        <span class="badge">
                            ✉️ Pour répondre à {data['nom']}, utilisez: {data['email_utilisateur']}
                        </span>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© 2026 ReaxAcademy - Tous droits réservés</p>
                    <p style="margin:5px 0 0; font-size:11px;">
                        Cet email a été envoyé depuis le formulaire de contact de ReaxAcademy
                    </p>
                </div>
            </div>
        </body>
    </html>
    """
    
    # Version texte simple (fallback)
    text = f"""
NOUVEAU MESSAGE DE CONTACT - REAXACADEMY
{'='*60}

👤 INFORMATIONS DE L'EXPÉDITEUR :
{'─'*40}
Nom: {data['nom']}
Email: {data['email_utilisateur']}
Téléphone: {data['telephone']}
Sujet: {data['sujet']}

💬 MESSAGE :
{'─'*40}
{data['message']}
{'─'*40}

📅 Reçu le: {data['date_envoi']}

{'='*60}
Pour répondre à {data['nom']}, envoyez un email à: {data['email_utilisateur']}
    """
    
    # Création du message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"📬 Contact ReaxAcademy - {data['nom']} - {data['sujet']}"
    msg['From'] = DEFAULT_FROM_EMAIL
    msg['To'] = EMAIL_DESTINATAIRE  # TON email (achillemolo403@gmail.com)
    msg['Reply-To'] = data['email_utilisateur']  # Pour répondre directement à l'utilisateur
    
    # Attacher les versions
    msg.attach(MIMEText(text, 'plain'))
    msg.attach(MIMEText(html, 'html'))
    
    try:
        # Connexion au serveur
        print("\n🔄 Connexion au serveur Gmail...")
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        
        # Envoi
        print("📤 Envoi du message...")
        server.send_message(msg)
        server.quit()
        
        return True, "Message envoyé avec succès!"
        
    except smtplib.SMTPAuthenticationError:
        return False, "Erreur d'authentification Gmail. Vérifie ton mot de passe."
    except smtplib.SMTPException as e:
        return False, f"Erreur SMTP: {e}"
    except Exception as e:
        return False, f"Erreur inattendue: {e}"

# ============================================
# FONCTION D'AFFICHAGE
# ============================================

def afficher_resume(data):
    """Affiche un résumé des informations saisies"""
    
    print("\n" + "="*60)
    print("📋 RÉSUMÉ DES INFORMATIONS SAISIES")
    print("="*60)
    print(f"👤 Nom: {data['nom']}")
    print(f"📧 Email utilisateur: {data['email_utilisateur']}")
    print(f"📱 Téléphone: {data['telephone']}")
    print(f"📋 Sujet: {data['sujet']}")
    print(f"💬 Message: {data['message'][:80]}..." if len(data['message']) > 80 else f"💬 Message: {data['message']}")
    print(f"📅 Date: {data['date_envoi']}")
    print("="*60)

# ============================================
# PROGRAMME PRINCIPAL
# ============================================

def main():
    """Fonction principale"""
    
    print("\n" + "★"*60)
    print("📧 REAXACADEMY - FORMULAIRE DE CONTACT")
    print("★"*60)
    print(f"📨 Les informations seront envoyées à: {EMAIL_DESTINATAIRE}")
    print("★"*60)
    
    nombre_messages = 0
    
    while True:
        # Saisie des informations
        data = saisir_informations()
        
        # Afficher le résumé
        afficher_resume(data)
        
        # Demander confirmation
        print("\n📧 Un email va être envoyé avec TOUTES ces informations.")
        confirmation = input("❓ Confirmer l'envoi? (o/n): ").strip().lower()
        
        if confirmation == 'o':
            # Envoyer l'email
            success, message = envoyer_email(data)
            
            if success:
                nombre_messages += 1
                print(f"\n✅ {message}")
                print(f"📬 Vérifie ta boîte de réception: {EMAIL_DESTINATAIRE}")
                print(f"📧 L'email contient toutes les informations de l'utilisateur.")
            else:
                print(f"\n❌ {message}")
        else:
            print("\n⏸️ Envoi annulé.")
        
        # Proposer un nouveau message
        print("\n" + "─"*60)
        nouveau = input("❓ Voulez-vous saisir un autre message? (o/n): ").strip().lower()
        if nouveau != 'o':
            print("\n" + "★"*60)
            print(f"📊 RÉCAPITULATIF: {nombre_messages} message(s) envoyé(s)")
            print(f"📧 Tous les emails ont été reçus sur: {EMAIL_DESTINATAIRE}")
            print("👋 Merci d'avoir utilisé ReaxAcademy!")
            print("★"*60)
            break

# ============================================
# POINT D'ENTRÉE
# ============================================

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Programme interrompu. Au revoir!")
    except Exception as e:
        print(f"\n❌ Erreur: {e}")