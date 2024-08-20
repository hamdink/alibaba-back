import { Injectable } from "@nestjs/common";
import { ReservationFactoryService } from "./reservation-factory.service";
import { AbstractMailerService, CreateReservationDto, IDataServices, Reservation, Status } from "src/core";

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
          const subject = 'Reservation Confirmation';
          const htmlContent = `<p>Your reservation has been successfully created.</p>`;
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
            console.log("reservation", reservation);
            reservation.status = Status.confirmed;
            const updatedReservation = await this.dataServices.reservations.update(id, reservation);

            const user = await this.dataServices.users.get({ _id: reservation.userId });

            const subject = 'Reservation Confirmation';
            const htmlContent = `<p>Your reservation has been confirmed.</p><p>Details:</p>
                                 <ul>
                                     <li>Date: ${reservation.date}</li>
                                     <li>Time: ${reservation.heure}</li>
                                     <li>Activity: ${reservation.activity}</li>
                                     <li>Hotel: ${reservation.hotel}</li>
                                 </ul>`;

            // Send the confirmation email
            await this.mailerService.sendEmail(user.email, subject, htmlContent);
            return updatedReservation;
        } catch (error) {
            throw error;
        }
    }



}