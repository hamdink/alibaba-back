import { Injectable } from "@nestjs/common";
import { ReservationFactoryService } from "./reservation-factory.service";
import { AbstractMailerService, CreateReservationDto, IDataServices, Participant, Reservation, Status } from "src/core";
import { generateReservationEmailContent } from "src/core/mailerTemplates/reservationTemplate";
import { generateConfirmationEmailContent } from "src/core/mailerTemplates/confirmationReservationTemplate";

@Injectable()
export class ReservationUseCases{
    constructor(
        private readonly reservationFactoryService: ReservationFactoryService,
        private readonly mailerService: AbstractMailerService,
        private dataServices: IDataServices
    ){ }

    async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
        try {
          const newReservationData = this.reservationFactoryService.createNewReservation(createReservationDto);
          const newReservation = await this.dataServices.reservations.create(newReservationData);
          const user = await this.dataServices.users.get({ _id: newReservation.userId });
          const participants: any[] = [
            ...createReservationDto.NameOfParticipants.map(name => ({ name })), 
            ...createReservationDto.childrens.map(child => ({ name: child.name })) 
          ];

          const subject = 'Confirmation de demande de réservation';
          const htmlContent = generateReservationEmailContent(
            user.firstName,
            'Ali Baba',
            createReservationDto.activity,
            createReservationDto.date,
            createReservationDto.heure,
            participants,
             'alibaba@gmail.com'
          );
      
          await this.mailerService.sendEmail(user.email, subject, htmlContent);
      
          return newReservation;
        } catch (error) {
          throw error;
        }
      }
      
    async getAllReservations(): Promise<Reservation[]> {
        try {
            const reservations = await this.dataServices.reservations.findAllByAttribute('deletedAt', null);
            return reservations;
        } catch (error) {
            throw error;
        }
    }

    async updateReservation(id: string, updateReservationDto: CreateReservationDto): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({_id: id, deletedAt: null});
            if (!reservation) {
                throw new Error("Reservation not found");
            }
            const updatedReservationData = this.reservationFactoryService.updateReservation(updateReservationDto);
            const updatedReservation = await this.dataServices.reservations.update(id, updatedReservationData);
            return updatedReservation;
        } catch (error) {
            throw error;
        }
    }

    async deleteReservation(id: string): Promise<boolean> {
        try {
            const reservation = await this.dataServices.reservations.get({
                _id: id,
                deletedAt: null
            });
            if (!reservation) {
                throw new Error("Reservation not found");
            }
            await this.dataServices.reservations.delete(id);
            return reservation? true : false;
        } catch (error) {
            throw error;
        }
    }

    async getReservation(id: string): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({_id:id, deletedAt: null});
            if (!reservation) {
                throw new Error("Reservation not found");
            }
            return reservation;
        } catch (error) {
            throw error;
        }
    }

    async getReservationByUserId(userId: string): Promise<Reservation[]> {
        try {
            const reservations = await this.dataServices.reservations.findAllByAttributes({'userId':userId, 'deletedAt': null});
            if (!reservations) {
                throw new Error("Reservation not found");
            }
            return reservations;
        } catch (error) {
            throw error;
        }
    }

    async updateReservationStatus(id: string): Promise<Reservation> {
        try {
            const reservation = await this.dataServices.reservations.get({ _id: id, deletedAt: null });
            if (!reservation) {
                throw new Error("Reservation not found");
            }
    
            reservation.status = Status.confirmed;
            const updatedReservation = await this.dataServices.reservations.update(id, reservation);
    
            const user = await this.dataServices.users.get({ _id: reservation.userId });
    
            const participants: any[] = [
              ...reservation.NameOfParticipants.map(name => ({ name })),
              ...reservation.childrens.map(child => ({ name: child.name }))
            ];
    
            const subject = 'Confirmation de votre réservation';
            const htmlContent = generateConfirmationEmailContent(
                user.firstName,
                'Ali Baba',
                reservation.activity, 
                reservation.date,
                reservation.heure,
                participants, 
                'Alibaba@gmail.com'
            );
    
            await this.mailerService.sendEmail(user.email, subject, htmlContent);
    
            return updatedReservation;
        } catch (error) {
            throw error;
        }
    }
    


}