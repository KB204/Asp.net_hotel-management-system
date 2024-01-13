﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Project_Dotnet.Data;

#nullable disable

namespace Project_Dotnet.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231217225221_UpdateReservation2TableToDb")]
    partial class UpdateReservation2TableToDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.9");

            modelBuilder.Entity("Project_Dotnet.Models.Categorie", b =>
                {
                    b.Property<int>("CategorieID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Capacity")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("CategorieDescription")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("CategorieName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CategorieID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Client", b =>
                {
                    b.Property<int>("ClientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Addresse")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Cin")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telephone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ClientID");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Facilitie", b =>
                {
                    b.Property<int>("FacilitieID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FacilitieDescription")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FacilitieName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("FacilitiePrice")
                        .HasColumnType("TEXT");

                    b.HasKey("FacilitieID");

                    b.ToTable("Facilities");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Reservation", b =>
                {
                    b.Property<int>("ReservationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CheckInDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CheckOutDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("ClientID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FacilitieID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoomID")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("TEXT");

                    b.HasKey("ReservationID");

                    b.HasIndex("ClientID");

                    b.HasIndex("FacilitieID");

                    b.HasIndex("RoomID");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Room", b =>
                {
                    b.Property<int>("RoomID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategorieID")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoomNumber")
                        .HasColumnType("INTEGER");

                    b.HasKey("RoomID");

                    b.HasIndex("CategorieID");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Project_Dotnet.Models.RoomService", b =>
                {
                    b.Property<int>("RoomID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ServiceID")
                        .HasColumnType("INTEGER");

                    b.HasKey("RoomID", "ServiceID");

                    b.HasIndex("ServiceID");

                    b.ToTable("RoomService");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Service", b =>
                {
                    b.Property<int>("ServiceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("ServiceDescription")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ServiceName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ServiceID");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Reservation", b =>
                {
                    b.HasOne("Project_Dotnet.Models.Client", "Client")
                        .WithMany("Reservations")
                        .HasForeignKey("ClientID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Project_Dotnet.Models.Facilitie", "Facilitie")
                        .WithMany("Reservations")
                        .HasForeignKey("FacilitieID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Project_Dotnet.Models.Room", "Room")
                        .WithMany("Reservations")
                        .HasForeignKey("RoomID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Facilitie");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Room", b =>
                {
                    b.HasOne("Project_Dotnet.Models.Categorie", "Categorie")
                        .WithMany("Rooms")
                        .HasForeignKey("CategorieID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Categorie");
                });

            modelBuilder.Entity("Project_Dotnet.Models.RoomService", b =>
                {
                    b.HasOne("Project_Dotnet.Models.Room", "Room")
                        .WithMany("RoomServices")
                        .HasForeignKey("RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Project_Dotnet.Models.Service", "Service")
                        .WithMany("RoomServices")
                        .HasForeignKey("ServiceID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Categorie", b =>
                {
                    b.Navigation("Rooms");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Client", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Facilitie", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Room", b =>
                {
                    b.Navigation("Reservations");

                    b.Navigation("RoomServices");
                });

            modelBuilder.Entity("Project_Dotnet.Models.Service", b =>
                {
                    b.Navigation("RoomServices");
                });
#pragma warning restore 612, 618
        }
    }
}
