import { Participant } from "../dtos";

export function generateConfirmationEmailContent(
    clientName: string,
    companyName: string,
    activities: string[], 
    date: string,
    time: string,
    participants: Participant[], 
    contactInfo: string
  ): string {
    const activitiesList = activities.map(activity => `<li style="margin-bottom: 5px;">${activity}</li>`).join('');
    
    const participantsList = participants
      .filter(participant => participant && participant.name) 
      .map(participant => `<li style="margin-bottom: 5px;">${participant.name}</li>`)
      .join('');
  
    if (!participantsList) {
      console.warn('Participants list is empty or undefined.');
    }
  
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #555;">Confirmation de Réservation</h2>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Cher <strong>${clientName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.5;">
              Nous sommes heureux de vous informer que votre réservation avec <strong>${companyName}</strong> a été confirmée. Voici les détails de votre réservation :
            </p>
            <div style="background-color: #fafafa; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;">
                  <strong>Activités :</strong> 
                  <ul style="padding-left: 20px;">${activitiesList}</ul>
                </li>
                <li style="margin-bottom: 10px;">
                  <strong>Date :</strong> ${date}
                </li>
                <li style="margin-bottom: 10px;">
                  <strong>Heure :</strong> ${time}
                </li>
                <li>
                  <strong>Participants :</strong> 
                  <ul style="padding-left: 20px;">${participantsList}</ul>
                </li>
              </ul>
            </div>
            <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
              Si vous avez des questions ou si vous devez apporter des modifications à votre réservation, n'hésitez pas à nous contacter à <strong>${contactInfo}</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
              Merci pour votre confiance et à très bientôt !
            </p>
            <p style="font-size: 16px; line-height: 1.5;">Cordialement,</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>${companyName}</strong></p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${companyName}. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    `;
  }
